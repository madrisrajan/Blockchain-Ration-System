const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();// Unhandled 'error' event
});

app.use(require("./routes/auth"));
app.use(require("./routes/centralgovcc"));
app.use(require("./routes/districtofficecc"));
app.use(require("./routes/rationshopcc"));
app.use(require("./routes/stategovcc"));
app.use(require("./routes/citizencc"));



app.listen(3000, console.log("started"));