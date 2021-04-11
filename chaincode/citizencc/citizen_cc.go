package main

import (
	"crypto/x509"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/hyperledger/fabric-chaincode-go/pkg/cid"
	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
)

type Chaincode struct{
}

type Foodgrain struct{
	ID       string `json:"ID"`
	TYPE     string `json:"TYPE"`
	Quantity string `json:"Quantity"`
	Quality  string `json:"Quality"`
	Holder   string `json:"Holder"`
}

type citizen struct {
	ID            string `json:"ID"`
	Name          string `json:"Name"`
	Age           string `json:"Age"`
	DOB           string `json:"DOB"`
	Gender        string `json:"Gender"`
	Address       string `json:"Address"`
	MobileNumber  string `json:"MobileNumber"`
	Rationcard_number  string `json:"Rationcard_number"`
	
	


}


func (cc *Chaincode) Init(stub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

// Invoke is called as a result of an application request to run the chaincode.
func (cc *Chaincode) Invoke(stub shim.ChaincodeStubInterface) sc.Response {
	fcn, params := stub.GetFunctionAndParameters()
	fmt.Println("Invoke()", fcn, params)

	if fcn == "createNewCitizen" {
		return cc.createNewCitizen(stub, params)
	}else if fcn == "createNewfoodGrains"{
		return cc.createNewfoodGrains(stub, params)
	}else if fcn == "getRiceCount"{
		return cc.getRiceCount(stub, params)
	}else if fcn == "getWheatCount"{
		return cc.getWheatCount(stub, params)
	}else{
		fmt.Println("INvoke() did not find func: " + fcn)
		return shim.Error("Received unknown function invocation!")
	}
}


// Function to enter new Foodgrains.
func (cc *Chaincode) createNewCitizen(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	// check Access
	creatorOrg, creatorCertIssuer, err := getTxCreatorInfo(stub)
	if !authenticateRationshop(creatorOrg, creatorCertIssuer) {
		return shim.Error("{\"Error\":\"Access Denied!\",\"Payload\":{\"MSP\":\"" + creatorOrg + "\",\"CA\":\"" + creatorCertIssuer + "\"}}")
	}

	// Check if sufficient params are passed.
	if len(params) != 8 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	// Check if params are non-empty.
	for a:=0; a<8; a++ {
		if len(params[a]) <= 0 {
			return shim.Error("Argument must be a non-empty string")
		}
	}


	id := params[0]
	name := strings.ToLower(params[1])
	age,err := strconv.Atoi(params[2])
	if err!=nil {
		return shim.Error(err.Error())
	}
	dob := params[3]
	gender := strings.ToLower(params[4])
	address := strings.ToLower(params[5])
	mobilenumber := strings.ToLower(params[6])
	rationcardnumber := strings.ToLower(params[7])

	// Check if citizen exist with Key => ID.
	citizenAsBytes, err := stub.GetState(id)
	if err != nil {
		return shim.Error("Failed to check if asset exists!")
	} else if citizenAsBytes != nil {
		return shim.Error("citizen with ID already exists!")
	}

	// Generate citizen from the information provided.
	NewCitizen := &citizen{id,name,strconv.Itoa(age),dob,gender,address,mobilenumber,rationcardnumber}

	citizenJSONasBytes, err := json.Marshal(NewCitizen)
	if err != nil {
		return shim.Error(err.Error())
	}

	// Put state of newly generated citizen with Key => Id.
	err = stub.PutState(id,citizenJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}



	return shim.Success(nil)



}



// Function to enter new Foodgrains.
func (cc *Chaincode) createNewfoodGrains(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	// check Access
	creatorOrg, creatorCertIssuer, err := getTxCreatorInfo(stub)
	if !authenticateRationshop(creatorOrg, creatorCertIssuer) {
		return shim.Error("{\"Error\":\"Access Denied!\",\"Payload\":{\"MSP\":\"" + creatorOrg + "\",\"CA\":\"" + creatorCertIssuer + "\"}}")
	}

	// Check if sufficient params are passed.
	if len(params) != 5 {
		return shim.Error("Incorrect number of arguments. Expecting 5")
	}

	// Check if params are non-empty.
	for a:=0; a<5; a++ {
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
	foodGrain := &Foodgrain{ID,TYPE,Quantity,Quality,Holder}

	foodGrainJSONasBytes, err := json.Marshal(foodGrain)
	if err != nil {
		return shim.Error(err.Error())
	}

	// Put state of newly generated foodgrains with Key => Id.
	err = stub.PutState(ID,foodGrainJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}


	indexName := "citType-citQuantity-citid"
	typequantityidkey, err := stub.CreateCompositeKey(indexName, []string{foodGrain.TYPE, foodGrain.Quantity, foodGrain.ID})
	if err != nil{
		return shim.Error(err.Error())
	}

	value := []byte{0x00}
	compositekeyerr := stub.PutState(typequantityidkey, value)
	if compositekeyerr != nil{
		return shim.Error(compositekeyerr.Error())
	}


	return shim.Success(nil)



}



//function to get Quantity of Rice
func (cc *Chaincode) getRiceCount(stub shim.ChaincodeStubInterface ,params []string) sc.Response{

	if len(params)!=1{
		return shim.Error("Incorrect number of argument. Expecting 1")
	}

	if len(params[0])<=0 {
		return shim.Error("argument must not be empty!")
	}

	Type := strings.ToLower(params[0])
	var total int
    total = 0
	
	RiceResultIterator, err := stub.GetStateByPartialCompositeKey("citType-citQuantity-citid", []string{Type})
	
	if err != nil{
		return shim.Error(err.Error());
	}

	defer RiceResultIterator.Close();
	var i int

	for i=0; RiceResultIterator.HasNext(); i++{
		responseRange, err := RiceResultIterator.Next()
		if err != nil{
			return shim.Error(err.Error())

		}

		objectType, compositeKeyPart, err := stub.SplitCompositeKey(responseRange.Key)
		if err != nil{
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
func (cc *Chaincode) getWheatCount(stub shim.ChaincodeStubInterface ,params []string) sc.Response{

	if len(params)!=1{
		return shim.Error("Incorrect number of argument. Expecting 1")
	}

	if len(params[0])<=0 {
		return shim.Error("argument must not be empty!")
	}

	Type := strings.ToLower(params[0])
	var total int
    total = 0
	
	WheatResultIterator, err := stub.GetStateByPartialCompositeKey("citType-citQuantity-citid", []string{Type})
	
	if err != nil{
		return shim.Error(err.Error());
	}

	defer WheatResultIterator.Close();
	var i int

	for i=0; WheatResultIterator.HasNext(); i++{
		responseRange, err := WheatResultIterator.Next()
		if err != nil{
			return shim.Error(err.Error())

		}

		objectType, compositeKeyPart, err := stub.SplitCompositeKey(responseRange.Key)
		if err != nil{
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