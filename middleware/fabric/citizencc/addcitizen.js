const { FileSystemWallet, Gateway } = require("fabric-network");
const path = require("path");

addCitizen = async (user, payload) => {
    const ccp = require(`../ccp/connection-citizens.json`);
    const walletPath = path.join(process.cwd(), `wallet_citizens`);
    const wallet = new FileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'admin',
        discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mainchannel");

    // Get the contract from the network.
    const contract = network.getContract("citizencc");

    // Evaluate the specified transaction.
    await contract.submitTransaction("createNewCitizen", 
       payload.ID,
       payload.name,
       payload.age,
       payload.dob,
       payload.gender,
       payload.address,
       payload.mobilenumber,
       payload.rationcardnumber
    
    );

    
};

module.exports = addCitizen;