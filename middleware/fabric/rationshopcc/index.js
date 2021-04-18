const GetRiceCount = require("./getricecount");
const GetWheatCount = require("./getwheatcount");
const transferToCitizen = require("./distributetocitizen")

const payload = {
    GetRiceCount,
    GetWheatCount,
    transferToCitizen,
};

module.exports = payload;