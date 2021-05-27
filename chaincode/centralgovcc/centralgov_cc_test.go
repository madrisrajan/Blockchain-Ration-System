package main

import (
	"testing"

	"github.com/hyperledger/fabric-chaincode-go/shim"
)


func TestInit(t *testing.T) {
	cc := new(Chaincode)
	stub := shim.NewMockStub("centralgov_cc", cc)
	res := stub.MockInit("1", [][]byte{[]byte("initFunc")})
	if res.Status != shim.OK {
		t.Error("Init failed", res.Status, res.Message)
	}
}