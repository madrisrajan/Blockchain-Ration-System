const { FileSystemWallet, Gateway } = require("fabric-network");
const path = require("path");

viewCitizenProfile = async (user, rationcardnumber) => {

    const ccp = require(`../ccp/connection-citizens.json`);
    const walletPath = path.join(process.cwd(),`wallet_citizens`);
    const wallet = new FileSystemWallet(walletPath);
    console.log(`allet path: ${walletPath}`);

    //create a new gateway for connecting to our peer node
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'admin',
        discovery: {enabled: true, asLocalhost: true},
    });

    //Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mainchannel");

    //Get the contract from the network.
    const contract = network.getContract("citizencc");

    //Evaluate the specified transaction.
    const result = await contract.evaluateTransaction("viewCitizenProfile",rationcardnumber);

     console.log(result)

    return JSON.parse(result);


};

module.exports = viewCitizenProfile;