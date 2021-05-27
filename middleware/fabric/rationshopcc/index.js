const GetRiceCount = require("./getricecount");
const GetWheatCount = require("./getwheatcount");
const transferToCitizen = require("./distributetocitizen")
const GetHistory = require("./gethistory")

const payload = {
    GetRiceCount,
    GetWheatCount,
    transferToCitizen,
    GetHistory,
};

module.exports = payload;