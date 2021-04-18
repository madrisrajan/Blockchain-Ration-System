const express = require("express");
const md5 = require("md5")
const Citizen = require("../../fabric/citizencc");

const router = new express.Router();

router.post("/api/main/citizen/add", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    try {
        citizendata = JSON.parse(req.body.payload);
        citizendata.ID = md5(JSON.stringify(citizendata) + new Date().toString());
        console.log(citizendata)
        await Citizen.AddCitizen('citizens', citizendata);
        res.status(200).send({
            message: "Citizen have been successfully Registered!",
            id: citizendata.ID,
            succode: "1",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error! Citizen NOT Added!" });
    }
});


router.get("/api/main/citizen/ricecount/:ration",async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const Type = 'rice';
    try {
        ration_card_no = req.params.ration
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

module.exports = router;