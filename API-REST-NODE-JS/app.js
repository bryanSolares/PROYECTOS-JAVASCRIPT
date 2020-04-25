
const express = require("express");
const bodyParse = require("body-parser");   
const morgan = require("morgan");
const hbs = require("express-handlebars")
const api = require("./routes/index")

const app = express();

//Middlewares
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());
app.use(morgan("dev"));
app.engine(".hbs",hbs({
    defaultLayout: "default",
    extname: "hbs"
}))
app.set("view engine",".hbs");
//Routes
app.use("/api",api);
app.use("/login",(req,res)=>{
    res.render("login");
});
app.use("/",(req, res)=>{
    res.render("product");
})

module.exports = app;