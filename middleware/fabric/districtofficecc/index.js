const GetRiceCount = require("./getricecount");
const GetWheatCount = require("./getwheatcount");
const TransferToRation = require("./distributetoration")
const GetHistory = require("./gethistory")

const payload = {
    GetRiceCount,
    GetWheatCount,
    TransferToRation,
    GetHistory,
};

module.exports = payload;