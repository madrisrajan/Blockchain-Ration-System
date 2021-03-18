#!/bin/bash
echo "Creating channel..."
ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
CORE_PEER_LOCALMSPID=CentralGovernmentMSP
CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/central_gov.example.com/peers/peer0.central_gov.example.com/tls/ca.crt
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/central_gov.example.com/users/Admin@central_gov.example.com/msp
CORE_PEER_ADDRESS=peer0.central_gov.example.com:7051
CHANNEL_NAME=mainchannel
CORE_PEER_TLS_ENABLED=true
ORDERER_SYSCHAN_ID=syschain

peer channel create -o orderer.example.com:7050 -c $CHANNEL_NAME -f ./channel-artifacts/channel.tx --tls $CORE_PEER_TLS_ENABLED --cafile $ORDERER_CA >&log.txt

cat log.txt

#peer channel create -o orderer.lean.com:7050 /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/lean.com/orderers/orderer.lean.com/msp/tlscacerts/tlsca.lean.com-cert.pem -c mainchannel -f ./channel-artifacts/channel.tx
sleep 10
echo
echo "Channel created, joining Central_Government..."
peer channel join -b mainchannel.block
