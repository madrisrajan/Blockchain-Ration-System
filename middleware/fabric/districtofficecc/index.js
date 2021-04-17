const GetRiceCount = require("./getricecount");
const GetWheatCount = require("./getwheatcount");
const TransferToRation = require("./distributetoration")

const payload = {
    GetRiceCount,
    GetWheatCount,
    TransferToRation,
};

module.exports = payload;