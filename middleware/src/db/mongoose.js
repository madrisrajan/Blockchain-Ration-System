const mongoose = require("mongoose");

const connectionString =
    "mongodb://127.0.0.1:27017";

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
