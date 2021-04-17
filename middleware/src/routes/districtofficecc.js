const express = require("express");
const md5 = require("md5")
const DistrictOffice = require("../../fabric/districtofficecc");

const router = new express.Router();

router.post("/api/main/district/distribute", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        foodgraindata = JSON.parse(req.body.payload);
        foodgraindata.Holder = 'Ration Shop'
        
        foodgraindata.ID = md5(JSON.stringify(foodgraindata) + new Date().toString());
        await DistrictOffice.TransferToRation('districtoffice', foodgraindata);
        res.status(200).send({
            message: "Foodgrin has been successfully distributed!",
            id: foodgraindata.ID,
            succode : 1,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error! ChargeSheet NOT Added!" });
    }
});

router.get("/api/main/district/ricecount",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const Type = 'rice';
    try {
        let data = await DistrictOffice.GetRiceCount('districtoff', Type);
        res.status(200).send(data.toString());
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

router.get("/api/main/district/wheatcount",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const Type = 'wheat';
    try {
        let data = await DistrictOffice.GetWheatCount('districtoff', Type);
        res.status(200).send(data.toString());
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

module.exports = router;