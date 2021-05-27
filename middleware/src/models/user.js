const mongoose = require('mongoose')
const userJSON = require("./json/citizen.json");
require("../db/mongoose");

const userInfo = new mongoose.Schema(userJSON)

const user = mongoose.model('UserInfo',userInfo,'userinfo')

module.exports = user;