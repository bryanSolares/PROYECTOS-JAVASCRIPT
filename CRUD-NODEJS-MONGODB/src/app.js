const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

//Connect to Mongoose
mongoose.connect("mongodb://localhost/crud-mongo")
.then(data=>console.log("Conectado correctamente"))
.catch(error => console.log("Error: ",error));

//Settings
app.set("port", process.env.PORT || 3000);
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));

//Routes
app.use(require("./routes/index.routes"));


//Starting the server
app.listen(app.get("port"),()=>{
    console.log(`Server on port ${app.get("port")}`);
});
