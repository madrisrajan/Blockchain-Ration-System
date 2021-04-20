const InputFoodGrains = require("./inputfoodgrains");
const GetRiceCount = require("./getricecount");
const GetWheatCount = require("./getwheatcount");
const Transfertostate = require("./transfertostate")
const GetHistory = require("./gethistory")

const payload = {
    InputFoodGrains,
    GetRiceCount,
    GetWheatCount,
    Transfertostate,
    GetHistory,
};

module.exports = payload;