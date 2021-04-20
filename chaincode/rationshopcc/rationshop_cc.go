package main

import (
	"crypto/x509"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"bitbucket.org/mediumblockchain/m3/common/util"
	"github.com/hyperledger/fabric-chaincode-go/pkg/cid"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
)

type Chaincode struct {
}

type Foodgrain struct {
	ID       string `json:"ID"`
	TYPE     string `json:"TYPE"`
	Quantity string `json:"Quantity"`
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
	} else if fcn == "transferToCitizen" {
		return cc.transferToCitizen(stub, params)
	} else {
		fmt.Println("INvoke() did not find func: " + fcn)
		return shim.Error("Received unknown function invocation!")
	}
}

// Function to enter new Foodgrains.
func (cc *Chaincode) createNewfoodGrains(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	// check Access
	creatorOrg, creatorCertIssuer, err := getTxCreatorInfo(stub)
	if !authenticateDistrict(creatorOrg, creatorCertIssuer) {
		return shim.Error("{\"Error\":\"Access Denied!\",\"Payload\":{\"MSP\":\"" + creatorOrg + "\",\"CA\":\"" + creatorCertIssuer + "\"}}")
	}

	// Check if sufficient params are passed.
	if len(params) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	// Check if params are non-empty.
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

	// Check if Foodgrains exist with Key => ID.
	foodgrainsAsBytes, err := stub.GetState(ID)
	if err != nil {
		return shim.Error("Failed to check if asset exists!")
	} else if foodgrainsAsBytes != nil {
		return shim.Error("Foodgrain with ID already exists!")
	}

	// Generate foodgrains from the information provided.
	foodGrain := &Foodgrain{ID, TYPE, Quantity, Quality, Holder}

	foodGrainJSONasBytes, err := json.Marshal(foodGrain)
	if err != nil {
		return shim.Error(err.Error())
	}

	// Put state of newly generated foodgrains with Key => Id.
	err = stub.PutState(ID, foodGrainJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	indexName := "ratType-ratQuantity-ratid"
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

	RiceResultIterator, err := stub.GetStateByPartialCompositeKey("ratType-ratQuantity-ratid", []string{Type})

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

		intreturnedQuantity, err := strconv.Atoi(returnedQuantity)

		total += intreturnedQuantity

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

	WheatResultIterator, err := stub.GetStateByPartialCompositeKey("ratType-ratQuantity-ratid", []string{Type})

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

		intreturnedQuantity, err := strconv.Atoi(returnedQuantity)

		total += intreturnedQuantity

	}

	finalQuantity := strconv.Itoa(total)

	return shim.Success([]byte(finalQuantity))

}



// Function to transfer items to citizens

func (cc *Chaincode) transferToCitizen(stub shim.ChaincodeStubInterface, params []string) sc.Response {

	//   check access to ration shop
	creatorOrg, creatorCertIssuer, err := getTxCreatorInfo(stub)
	if !authenticateRationshop(creatorOrg, creatorCertIssuer) {
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

	quantity_to_citizen, err := strconv.Atoi(params[0])
	if err != nil {
		return shim.Error(err.Error())
	}
	Type := strings.ToLower(params[1])
	new_holder := strings.ToLower(params[2])
	new_id := params[3]
	ration_card_no := params[4]
	final_transfer:= quantity_to_citizen

	ItemIdxIterator, err := stub.GetStateByPartialCompositeKey("ratType-ratQuantity-ratid", []string{Type})

	if err != nil {
		return shim.Error(err.Error())
	}

	defer ItemIdxIterator.Close()

	for quantity_to_citizen > 0 {
		responseRange, err := ItemIdxIterator.Next()
		if err != nil {
			return shim.Error(err.Error())

		}

		objectType, compositeKeyPart, err := stub.SplitCompositeKey(responseRange.Key)
		if err != nil {
			return shim.Error(err.Error())

		}

		fmt.Print(objectType)

		transfer_item_id := compositeKeyPart[2]
		transfer_quantity, err := strconv.Atoi(compositeKeyPart[1])
		if err != nil {
			return shim.Error(err.Error())

		}

		foodgrainsAsBytes, err := stub.GetState(transfer_item_id)
		if err != nil {
			return shim.Error("Failed to get Details!")
		} else if foodgrainsAsBytes == nil {
			return shim.Error("Error: Id Does NOT Exist!")
		}

		foodgrainToUpdate := Foodgrain{}

		err = json.Unmarshal(foodgrainsAsBytes, &foodgrainToUpdate) //unmarshal it aka JSON.parse()
		if err != nil {
			return shim.Error(err.Error())
		}

		if quantity_to_citizen >= transfer_quantity {
			foodgrainToUpdate.Quantity = strconv.Itoa(0)
			quantity_to_citizen = quantity_to_citizen - transfer_quantity
		} else {
			foodgrainToUpdate.Quantity = strconv.Itoa(transfer_quantity - quantity_to_citizen)
			quantity_to_citizen = 0

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

		indexName := "ratType-ratQuantity-ratid"
		typequantityidkey, err := stub.CreateCompositeKey(indexName, []string{foodgrainToUpdate.TYPE, foodgrainToUpdate.Quantity, foodgrainToUpdate.ID})
		if err != nil{
			return shim.Error(err.Error())
		}
	
		value := []byte{0x00}
		compositekeyerr := stub.PutState(typequantityidkey, value)
		if compositekeyerr != nil{
			return shim.Error(compositekeyerr.Error())
		}

	


}

	args := util.ToChaincodeArgs("createNewfoodGrain", new_id, Type,strconv.Itoa(final_transfer),"A",new_holder,ration_card_no)
	response := stub.InvokeChaincode("citizencc", args, "mainchannel")
	if response.Status != shim.OK {
		return shim.Error(response.Message)
	}

	return shim.Success([]byte("transfer to district successful"))

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

func authenticateRationshop(mspID string, certCN string) bool {
	return (mspID == "RationshopsMSP") && (certCN == "ca.ration_shops.example.com")
}

func authenticateDistrict(mspID string, certCN string) bool {
	return (mspID == "DistrictOfficeMSP") && (certCN == "ca.district_office.example.com")
}
