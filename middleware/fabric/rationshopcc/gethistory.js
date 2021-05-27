const { FileSystemWallet, Gateway } = require("fabric-network");
const path = require("path");

history = async () => {
    const ccp = require(`../ccp/connection-ration_shops.json`);
    const walletPath = path.join(process.cwd(), `wallet_rationshop`);
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
    const contract = network.getContract("rationshopcc");

    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction("getHistoryForRationShop");

    console.log(result.toString())

    return JSON.parse(result);
};

module.exports = history;