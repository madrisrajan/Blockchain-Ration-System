const express = require("express");
const md5 = require("md5")
const RationShop = require("../../fabric/rationshopcc");

const router = new express.Router();

router.post("/api/main/ration/inputgrains", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        foodgraindata = JSON.parse(req.body.payload);
        foodgraindata.Holder = 'Citizen'
        foodgraindata.ID = md5(JSON.stringify(foodgraindata) + new Date().toString());
        await RationShop.InputFoodGrains('ration_shops', foodgraindata);
        res.status(200).send({
            message: "Grains has been successfully transferred!",
            id: foodgraindata.ID,
            succode : '1'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error! grains NOT transferred!" });
    }
});

router.get("/api/main/ration/ricecount",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const Type = 'rice';
    try {
        let data = await RationShop.GetRiceCount('rationshops', Type);
        res.status(200).send(data.toString());
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

router.get("/api/main/ration/wheatcount",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const Type = 'wheat';
    try {
        let data = await RationShop.GetWheatCount('rationshops', Type);
        res.status(200).send(data.toString());
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

router.get("/api/main/ration/gethistory",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        let data = await RationShop.GetHistory();
        // console.log(data.toString());
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

module.exports = router;