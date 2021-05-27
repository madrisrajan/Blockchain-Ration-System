const mongoose = require('mongoose')
const userJSON = require("./json/citizen.json");
require("../db/mongoose");

const userCit = new mongoose.Schema(userJSON)

const citizenregister = mongoose.model('UserCit',userCit,'usercit')

module.exports = citizenregister;