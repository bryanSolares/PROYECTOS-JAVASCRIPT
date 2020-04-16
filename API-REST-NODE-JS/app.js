
const express = require("express");
const bodyParse = require("body-parser");   
const morgan = require("morgan");
const api = require("./routes/index")

const app = express();

//Middlewares
app.use(bodyParse.urlencoded({
    extended: false
}));
app.use(bodyParse.json());
app.use(morgan("dev"));


//Routes
app.use("/api",api);

module.exports = app;