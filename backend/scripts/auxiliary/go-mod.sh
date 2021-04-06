cd ../../chaincode

CC_DIR=$PWD

CC_NAMES="centralgovcc citizencc districtofficecc rationshopcc stategovcc"

for CC in $CC_NAMES; do
    echo "Installing Go dependencies in "$CC
    cd $CC
    go mod vendor
    cd ..
done
echo "Installing Go dependencies complete!"

