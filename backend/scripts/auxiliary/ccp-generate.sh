#!/bin/bash

function one_line_pem {
    echo "`awk 'NF {sub(/\\n/, ""); printf "%s\\\\\\\n",$0;}' $1`"
}

function json_ccp {
    local PP=$(one_line_pem $5)
    local CP=$(one_line_pem $6)
    sed -e "s/\${ORG}/$1/" \
        -e "s/\${ORGMSP}/$2/" \
        -e "s/\${P0PORT}/$3/" \
        -e "s/\${CAPORT}/$4/" \
        -e "s#\${PEERPEM}#$PP#" \
        -e "s#\${CAPEM}#$CP#" \
        ../../connections/ccp-template.json 
}

ORG=central_gov
ORGMSP=CentralGovernment
P0PORT=7051
CAPORT=7054
PEERPEM=../crypto-config/peerOrganizations/central_gov.example.com/tlsca/tlsca.central_gov.example.com-cert.pem
CAPEM=../crypto-config/peerOrganizations/central_gov.example.com/ca/ca.central_gov.example.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" >../../connections/connection-central_gov.json

ORG=state_gov
ORGMSP=StateGovernment
P0PORT=8051
CAPORT=8054
PEERPEM=../crypto-config/peerOrganizations/state_gov.example.com/tlsca/tlsca.state_gov.example.com-cert.pem
CAPEM=../crypto-config/peerOrganizations/state_gov.example.com/ca/ca.state_gov.example.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" >../../connections/connection-state_gov.json
ORG=district_office
ORGMSP=DistrictOffice
P0PORT=9051
CAPORT=9054
PEERPEM=../crypto-config/peerOrganizations/district_office.example.com/tlsca/tlsca.district_office.example.com-cert.pem
CAPEM=../crypto-config/peerOrganizations/district_office.example.com/ca/ca.district_office.example.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" >../../connections/connection-district_office.json

ORG=ration_shops
ORGMSP=Rationshops
P0PORT=10051
CAPORT=10054
PEERPEM=../crypto-config/peerOrganizations/ration_shops.example.com/tlsca/tlsca.ration_shops.example.com-cert.pem
CAPEM=../crypto-config/peerOrganizations/ration_shops.example.com/ca/ca.ration_shops.example.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" >../../connections/connection-ration_shops.json

ORG=citizens
ORGMSP=Citizens
P0PORT=11051
CAPORT=11054
PEERPEM=../crypto-config/peerOrganizations/citizens.example.com/tlsca/tlsca.citizens.example.com-cert.pem
CAPEM=../crypto-config/peerOrganizations/citizens.example.com/ca/ca.citizens.example.com-cert.pem

echo "$(json_ccp $ORG $ORGMSP $P0PORT $CAPORT $PEERPEM $CAPEM)" >../../connections/connection-citizens.json
