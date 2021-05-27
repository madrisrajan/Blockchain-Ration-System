const express = require("express");
const md5 = require("md5")
const StateGovernment = require("../../fabric/stategovcc");

const router = new express.Router();

router.post("/api/main/stategov/distribute", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        foodgraindata = JSON.parse(req.body.payload);
        foodgraindata.Holder = 'District Office'
        foodgraindata.ID = md5(JSON.stringify(foodgraindata) + new Date().toString());
        await StateGovernment.DistributeToDistrict('stategov', foodgraindata);
        res.status(200).send({
            message: "Grains have been successfully transferred from state!",
            id: foodgraindata.ID,
            succode : '1'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error! Grains NOT transferred!" });
    }
});

router.get("/api/main/stategov/ricecount",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const Type = 'rice';
    try {
        let data = await StateGovernment.GetRiceCount('state_gov', Type);
        res.status(200).send(data.toString());
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

router.get("/api/main/stategov/wheatcount",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const Type = 'wheat';
    try {
        let data = await StateGovernment.GetWheatCount('stategov', Type);
        res.status(200).send(data.toString());
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

router.get("/api/main/stategov/gethistory",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        let data = await StateGovernment.GetHistory();
        // console.log(data.toString());
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

module.exports = router;