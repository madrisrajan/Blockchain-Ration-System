package main

import (
	"crypto/x509"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"bytes"
	"time"

	"bitbucket.org/mediumblockchain/m3/common/util"
	"github.com/hyperledger/fabric-chaincode-go/pkg/cid"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
)

type Chaincode struct {
}

//foodgrain struct
type foodgrain struct {
	ID       string `json:"ID"`
	TYPE     string `json:"TYPE"`
	Quantity string `json:"quantity"`
	Quality  string `json:"Quality"`
	Holder   string `json:"Holder"`
}

func (cc *Chaincode) Init(stub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

// Invoke is called as a result of an application request to run the chaincode.
func (cc *Chaincode) Invoke(stub shim.ChaincodeStubInterface) sc.Response {
	fcn, params := stub.GetFunctionAndParameters()
	fmt.Println("Invoke()", fcn, params)

	if fcn == "createNewfoodGrains" {
		return cc.createNewfoodGrains(stub, params)
	} else if fcn == "getRiceCount" {
		return cc.getRiceCount(stub, params)
	} else if fcn == "getWheatCount" {
		return cc.getWheatCount(stub, params)
	} else if fcn == "transferTOState" {
		return cc.transferTOState(stub, params)
	} else if fcn == "getHistoryForCentralGOvernment"{
		return cc.getHistoryForCentralGOvernment(stub)
	}else {
		fmt.Println("INvoke() did not find func: " + fcn)
		return shim.Error("Received unknown function invocation!")
	}

}

//function to enter new foodgrains
func (cc *Chaincode) createNewfoodGrains(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	// check Access
	creatorOrg, creatorCertIssuer, err := getTxCreatorInfo(stub)
	if !authenticateCentralgov(creatorOrg, creatorCertIssuer) {
		return shim.Error("{\"Error\":\"Access Denied!\",\"Payload\":{\"MSP\":\"" + creatorOrg + "\",\"CA\":\"" + creatorCertIssuer + "\"}}")
	}
	// Check if sufficient Params passed
	if len(params) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}
	// Check if Params are non-empty
	for a := 0; a < 5; a++ {
		if len(params[a]) <= 0 {
			return shim.Error("Argument must be a non-empty string")
		}
	}

	ID := params[0]
	TYPE := strings.ToLower(params[1])
	Quantity := params[2]
	Quality := strings.ToLower(params[3])
	Holder := strings.ToLower(params[4])

	// Check if foodgrain exists with Key => ID
	foodgrainsAsBytes, err := stub.GetState(ID)
	if err != nil {
		return shim.Error("Failed to check if Asset exists!")
	} else if foodgrainsAsBytes != nil {
		return shim.Error("foodgrain with id Already Exists!")
	}

	//generate foodgrains from the information provided
	foodGrain := &foodgrain{ID, TYPE, Quantity, Quality, Holder}

	foodGrainJSONasBytes, err := json.Marshal(foodGrain)
	if err != nil {
		return shim.Error(err.Error())
	}

	//Put State of newly generated foddgrains with Key => ID
	err = stub.PutState(ID, foodGrainJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	indexName := "Type~Quantity~id"
	typequantityidkey, err := stub.CreateCompositeKey(indexName, []string{foodGrain.TYPE, foodGrain.Quantity, foodGrain.ID})
	if err != nil {
		return shim.Error(err.Error())
	}
	value := []byte{0x00}
	compositekeyerr := stub.PutState(typequantityidkey, value)
	if compositekeyerr != nil {
		return shim.Error(compositekeyerr.Error())
	}

	return shim.Success(nil)

}

//function to get Quantity of Rice
func (cc *Chaincode) getRiceCount(stub shim.ChaincodeStubInterface, params []string) sc.Response {

	if len(params) != 1 {
		return shim.Error("Incorrect number of argument. Expecting 1")
	}

	if len(params[0]) <= 0 {
		return shim.Error("argument must not be empty!")
	}

	Type := strings.ToLower(params[0])
	var total int
	total = 0

	RiceResultIterator, err := stub.GetStateByPartialCompositeKey("Type~Quantity~id", []string{Type})
	if err != nil {
		return shim.Error(err.Error())
	}

	defer RiceResultIterator.Close()
	var i int
	for i = 0; RiceResultIterator.HasNext(); i++ {
		responseRange, err := RiceResultIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		objectType, compositeKeyPart, err := stub.SplitCompositeKey(responseRange.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		returnedType := compositeKeyPart[0]
		returnedQuantity := compositeKeyPart[1]
		fmt.Printf("- found a goodgrain from index:%s TYPE:%s Quantity:%s\n", objectType, returnedType, returnedQuantity)

		intreturenedQuantity, err := strconv.Atoi(returnedQuantity)
		if err != nil {
			return shim.Error(err.Error())
		}

		total += intreturenedQuantity

	}

	finalQuantity := strconv.Itoa(total)

	return shim.Success([]byte(finalQuantity))

}

//function to get Quantity of wheat

func (cc *Chaincode) getWheatCount(stub shim.ChaincodeStubInterface, params []string) sc.Response {

	if len(params) != 1 {
		return shim.Error("Incorrect number of argument. Expecting 1")
	}

	if len(params[0]) <= 0 {
		return shim.Error("argument must not be empty!")
	}

	Type := strings.ToLower(params[0])
	var total int
	total = 0

	WheatResultIterator, err := stub.GetStateByPartialCompositeKey("Type~Quantity~id", []string{Type})
	if err != nil {
		return shim.Error(err.Error())
	}

	defer WheatResultIterator.Close()
	var i int
	for i = 0; WheatResultIterator.HasNext(); i++ {
		responseRange, err := WheatResultIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		objectType, compositeKeyPart, err := stub.SplitCompositeKey(responseRange.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		returnedType := compositeKeyPart[0]
		returnedQuantity := compositeKeyPart[1]
		fmt.Printf("- found a goodgrain from index:%s TYPE:%s Quantity:%s\n", objectType, returnedType, returnedQuantity)

		intreturenedQuantity, err := strconv.Atoi(returnedQuantity)
		if err != nil {
			return shim.Error(err.Error())
		}

		total += intreturenedQuantity

	}

	finalQuantity := strconv.Itoa(total)

	return shim.Success([]byte(finalQuantity))

}

//function to transfer Items to state

func (cc *Chaincode) transferTOState(stub shim.ChaincodeStubInterface, params []string) sc.Response {

	fmt.Printf("- entered the c")

	// check Access for central government
	creatorOrg, creatorCertIssuer, err := getTxCreatorInfo(stub)
	if !authenticateCentralgov(creatorOrg, creatorCertIssuer) {
		return shim.Error("{\"Error\":\"Access Denied!\",\"Payload\":{\"MSP\":\"" + creatorOrg + "\",\"CA\":\"" + creatorCertIssuer + "\"}}")
	}

	// Check if sufficient Params passed
	if len(params) != 4 {
		return shim.Error("Incorrect number of arguments. Expecting 4")
	}
	// Check if Params are non-empty
	for a := 0; a < 4; a++ {
		if len(params[a]) <= 0 {
			return shim.Error("Argument must be a non-empty string")
		}
	}

	quantity_to_state, err := strconv.Atoi(params[0])
	Type := strings.ToLower(params[1])
	new_holder := strings.ToLower(params[2])
	new_id := params[3]

	finaltransfer := quantity_to_state

	fmt.Printf("- dena hai %d", quantity_to_state)

	RiceidxIterator, err := stub.GetStateByPartialCompositeKey("Type~Quantity~id", []string{Type})
	if err != nil {
		return shim.Error(err.Error())

	}

	defer RiceidxIterator.Close()

	fmt.Printf("- beti")
	fmt.Printf("- quan to st\n")
	fmt.Printf("- kitna de rahe: %d\n", quantity_to_state)
	for quantity_to_state > 0 {

		responseRange, err := RiceidxIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		objectType, compositeKeyPart, err := stub.SplitCompositeKey(responseRange.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		fmt.Printf(objectType)
		fmt.Printf("- Composite keys\n")
		fmt.Printf("- part1: %s  part2:%s  part3:%s\n", compositeKeyPart[0], compositeKeyPart[1], compositeKeyPart[2])

		transfer_item_id := compositeKeyPart[2]
		transfer_quantity, err := strconv.Atoi(compositeKeyPart[1])

		fmt.Printf("- transfer quantity in loop\n")
		fmt.Printf("- %d\n", transfer_quantity)
		if err != nil {
			return shim.Error(err.Error())
		}

		foodgrainAsBytes, err := stub.GetState(transfer_item_id)
		if err != nil {
			return shim.Error("Failed to get foodgrains Details!")
		} else if foodgrainAsBytes == nil {
			return shim.Error("Error: foodgrains Does NOT Exist!")
		}

		foodgrainToUpdate := foodgrain{}
		err = json.Unmarshal(foodgrainAsBytes, &foodgrainToUpdate) //unmarshal it aka JSON.parse()
		if err != nil {
			return shim.Error(err.Error())
		}

		if quantity_to_state >= transfer_quantity {

			foodgrainToUpdate.Quantity = strconv.Itoa(0)
			quantity_to_state = quantity_to_state - transfer_quantity

		} else {
			foodgrainToUpdate.Quantity = strconv.Itoa(transfer_quantity - quantity_to_state)
			quantity_to_state = 0
		}

		foodgrainJSONasBytes, err := json.Marshal(foodgrainToUpdate)
		if err != nil {
			return shim.Error(err.Error())
		}

		err = stub.PutState(transfer_item_id, foodgrainJSONasBytes)
		if err != nil {
			return shim.Error(err.Error())
		}

		err = stub.DelState(responseRange.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		indexName := "Type~Quantity~id"
		typequantityidkey, err := stub.CreateCompositeKey(indexName, []string{foodgrainToUpdate.TYPE, foodgrainToUpdate.Quantity, foodgrainToUpdate.ID})
		if err != nil {
			return shim.Error(err.Error())
		}
		value := []byte{0x00}
		compositekeyerr := stub.PutState(typequantityidkey, value)
		if compositekeyerr != nil {
			return shim.Error(compositekeyerr.Error())
		}

	}

	args := util.ToChaincodeArgs("createNewfoodGrains", new_id, Type, strconv.Itoa(finaltransfer), "A", new_holder)
	response := stub.InvokeChaincode("stategovcc", args, "mainchannel")
	if response.Status != shim.OK {
		return shim.Error(response.Message)
	}

	return shim.Success([]byte("transfer to state successful"))

}

//function to get history of transactions
func (cc *Chaincode) getHistoryForCentralGOvernment(stub shim.ChaincodeStubInterface) sc.Response {




	fmt.Printf("- start getHistoryForCentralGovernment\n")
	Type:= "rice"
     // buffer is a JSON array containing historic values for the marble
	var buffer bytes.Buffer
	buffer.WriteString("[")
	bArrayMemberAlreadyWritten := false

	ResultIterator, err := stub.GetStateByPartialCompositeKey("Type~Quantity~id", []string{Type})
	if err != nil {
		return shim.Error(err.Error())
	}

	defer ResultIterator.Close()

	for ResultIterator.HasNext(){

		responseRange, err := ResultIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		objectType, compositeKeyPart, err := stub.SplitCompositeKey(responseRange.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		fmt.Printf("- found a goodgrain from index:%s\n", objectType)

		id:=  compositeKeyPart[2]

		resultsIterator, err := stub.GetHistoryForKey(id)
		if err != nil {
			return shim.Error(err.Error())
		}
		defer resultsIterator.Close()
	
		

	
		// bArrayMemberAlreadyWritten = false
		for resultsIterator.HasNext() {
			response, err := resultsIterator.Next()
			if err != nil {
				return shim.Error(err.Error())
			}
			// Add a comma before array members, suppress it for the first array member
			if bArrayMemberAlreadyWritten == true {
				buffer.WriteString(",")
			}
			buffer.WriteString("{\"TxId\":")
			buffer.WriteString("\"")
			buffer.WriteString(response.TxId)
			buffer.WriteString("\"")
	
			buffer.WriteString(", \"Value\":")
			// if it was a delete operation on given key, then we need to set the
			//corresponding value null. Else, we will write the response.Value
			//as-is (as the Value itself a JSON marble)
			if response.IsDelete {
				buffer.WriteString("null")
			} else {
				buffer.WriteString(string(response.Value))
			}
	
			buffer.WriteString(", \"Timestamp\":")
			buffer.WriteString("\"")
			buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
			buffer.WriteString("\"")
	
			buffer.WriteString(", \"IsDelete\":")
			buffer.WriteString("\"")
			buffer.WriteString(strconv.FormatBool(response.IsDelete))
			buffer.WriteString("\"")
	
			buffer.WriteString("}")
			bArrayMemberAlreadyWritten = true
		}
		
	
		fmt.Printf("- getHistoryForCentralGovernment returning:\n%s\n", buffer.String())

	}

	// buffer.WriteString(",")

	Type = "wheat"

	ResultIterator, err = stub.GetStateByPartialCompositeKey("Type~Quantity~id", []string{Type})
	if err != nil {
		return shim.Error(err.Error())
	}

	defer ResultIterator.Close()

	for ResultIterator.HasNext(){

		responseRange, err := ResultIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		objectType, compositeKeyPart, err := stub.SplitCompositeKey(responseRange.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		fmt.Printf("- found a goodgrain from index:%s\n", objectType)

		id:=  compositeKeyPart[2]

		resultsIterator, err := stub.GetHistoryForKey(id)
		if err != nil {
			return shim.Error(err.Error())
		}
		defer resultsIterator.Close()
	
		

	
		// bArrayMemberAlreadyWritten = false
		for resultsIterator.HasNext() {
			response, err := resultsIterator.Next()
			if err != nil {
				return shim.Error(err.Error())
			}
			// Add a comma before array members, suppress it for the first array member
			if bArrayMemberAlreadyWritten == true {
				buffer.WriteString(",")
			}
			buffer.WriteString("{\"TxId\":")
			buffer.WriteString("\"")
			buffer.WriteString(response.TxId)
			buffer.WriteString("\"")
	
			buffer.WriteString(", \"Value\":")
			// if it was a delete operation on given key, then we need to set the
			//corresponding value null. Else, we will write the response.Value
			//as-is (as the Value itself a JSON marble)
			if response.IsDelete {
				buffer.WriteString("null")
			} else {
				buffer.WriteString(string(response.Value))
			}
	
			buffer.WriteString(", \"Timestamp\":")
			buffer.WriteString("\"")
			buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
			buffer.WriteString("\"")
	
			buffer.WriteString(", \"IsDelete\":")
			buffer.WriteString("\"")
			buffer.WriteString(strconv.FormatBool(response.IsDelete))
			buffer.WriteString("\"")
	
			buffer.WriteString("}")
			bArrayMemberAlreadyWritten = true
		}
		
	
		fmt.Printf("- getHistoryForCentralGovernment returning:\n%s\n", buffer.String())

	}



	buffer.WriteString("]")

	



	return shim.Success(buffer.Bytes())
}

// Get Tx Creator Info
func getTxCreatorInfo(stub shim.ChaincodeStubInterface) (string, string, error) {
	var mspid string
	var err error
	var cert *x509.Certificate
	mspid, err = cid.GetMSPID(stub)

	if err != nil {
		fmt.Printf("Error getting MSP identity: %sn", err.Error())
		return "", "", err
	}

	cert, err = cid.GetX509Certificate(stub)
	if err != nil {
		fmt.Printf("Error getting client certificate: %sn", err.Error())
		return "", "", err
	}

	return mspid, cert.Issuer.CommonName, nil
}

func authenticateCentralgov(mspID string, certCN string) bool {
	return (mspID == "CentralGovernmentMSP") && (certCN == "ca.central_gov.example.com")
}
