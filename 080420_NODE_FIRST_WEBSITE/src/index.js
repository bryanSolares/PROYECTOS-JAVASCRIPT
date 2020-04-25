const express = require("express");
const path = require("path");

const app = express();

//Configuraciones
app.set("port", 4000);
app.set("views",path.join(__dirname,"views"));
app.engine("html",require("ejs").renderFile);
app.set("view engine","ejs");

//Middlewares

//Routes
app.use(require("./routes/")); //-> como alternativa también se puede crear una constante y luego pasarcelo al use. -> const routes = require("./ruta") -> app.use(routes);

//Statics Files
app.use(express.static(path.join(__dirname,"public")));

//Servidor escuchando
app.listen(app.get("port"),()=>{
    console.log(`Server on Port ${app.get("port")}`)
});