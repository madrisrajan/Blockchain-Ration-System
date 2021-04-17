const GetRiceCount = require("./getricecount");
const GetWheatCount = require("./getwheatcount");
const DistributeToDistrict = require("./distributetodistrict")

const payload = {
    GetRiceCount,
    GetWheatCount,
    DistributeToDistrict,
};

module.exports = payload;