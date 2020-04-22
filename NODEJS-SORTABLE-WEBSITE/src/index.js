const express = require("express");
const morgan = require("morgan");
const path = require("path");
const ejs = require("ejs-mate")

require("./db")

const app = express();

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejs);
app.set("view engine", "ejs");

//Middlewars
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Routes
app.use(require("./routes/index.routes"));

//Static Files
app.use(express.static(path.join(__dirname,"public")));

//Starting server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
})