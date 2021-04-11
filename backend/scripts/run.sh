cd ..
export IMAGE_TAG=1.4

docker-compose -f docker-compose-cli.yaml up -d

docker exec -it cli bash ./scripts/channel/create-channel.sh

docker exec -it cli bash ./scripts/channel/join-peer.sh peer0 state_gov StateGovernmentMSP 8051 1.0
docker exec -it cli bash ./scripts/channel/join-peer.sh peer0 district_office DistrictOfficeMSP 9051 1.0
docker exec -it cli bash ./scripts/channel/join-peer.sh peer0 ration_shops RationshopsMSP 10051 1.0
docker exec -it cli bash ./scripts/channel/join-peer.sh peer0 citizens CitizensMSP 11051 1.0

CC_NAMES="centralgovcc citizencc districtofficecc rationshopcc stategovcc"

for CC in $CC_NAMES; do
    echo "Installing "$CC
    docker exec -it cli bash ./scripts/install-cc/install-onpeer-cc.sh $CC peer0 central_gov CentralGovernmentMSP 7051 1.0
    docker exec -it cli bash ./scripts/install-cc/install-onpeer-cc.sh $CC peer0 state_gov StateGovernmentMSP 8051 1.0
    docker exec -it cli bash ./scripts/install-cc/install-onpeer-cc.sh $CC peer0 district_office DistrictOfficeMSP 9051 1.0
    docker exec -it cli bash ./scripts/install-cc/install-onpeer-cc.sh $CC peer0 ration_shops RationshopsMSP 10051 1.0
    docker exec -it cli bash ./scripts/install-cc/install-onpeer-cc.sh $CC peer0 citizens CitizensMSP 11051 1.0
    echo "Instantiating "$CC
    docker exec -it cli bash ./scripts/install-cc/instantiate.sh $CC
done

echo "All Done!"
