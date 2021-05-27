const express = require("express");
const md5 = require("md5")
const CentralGovernment = require("../../fabric/centralgovcc");

const router = new express.Router();

router.post("/api/main/centralgov/inputgrains", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        foodgraindata = JSON.parse(req.body.payload);
        foodgraindata.Holder = 'Central Government'
        foodgraindata.ID = md5(JSON.stringify(foodgraindata) + new Date().toString());
        console.log(req.body.payload)
        await CentralGovernment.InputFoodGrains(req.body.user, foodgraindata);
        res.status(200).send({
            message: "Grains have been successfully added!",
            id: foodgraindata.ID,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error! Grains NOT Added!" });
    }
});

router.post("/api/main/centralgov/transfertostate", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        transferdata = JSON.parse(req.body.payload);
        transferdata.Holder = 'State Government'
        transferdata.ID = md5(JSON.stringify(transferdata) + new Date().toString());
        console.log(req.body.payload)
        await CentralGovernment.Transfertostate('state_gov', transferdata);
        res.status(200).send({
            message: "Grains have been transferred successfully",
            id: transferdata.ID,
            succode: "1",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error! Counld not transfer" });
    }
});

router.get("/api/main/centralgov/ricecount",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const Type = 'rice';
    try {
        let data = await CentralGovernment.GetRiceCount('central_gov', Type);
        console.log(data.toString());
        res.status(200).send(data.toString());
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

router.get("/api/main/centralgov/wheatcount",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const Type = 'wheat';
    try {
        let data = await CentralGovernment.GetWheatCount('central_gov', Type);
        console.log(data.toString());
        res.status(200).send(data.toString());
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

router.get("/api/main/centralgov/gethistory",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        let data = await CentralGovernment.GetHistory();
        // console.log(data.toString());
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(404).send({ message: "Something went wrong" });
    }
});

module.exports = router;

