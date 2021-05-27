const GetRiceCount = require("./getricecount");
const GetWheatCount = require("./getwheatcount");
const DistributeToDistrict = require("./distributetodistrict")
const GetHistory = require("./gethistory")

const payload = {
    GetRiceCount,
    GetWheatCount,
    DistributeToDistrict,
    GetHistory,
};

module.exports = payload;