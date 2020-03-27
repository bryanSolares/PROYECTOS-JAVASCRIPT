/*IMPLEMENTACION TRADICONAL*/
/*
const http = require("http"); 

const server = http.createServer((req, res)=>{
    res.status = 200;
    res.setHeader("Content-Type","text/plain");
    res.end("Hello World");
});

server.listen(3000,()=>{
    console.log("Server on port 3000");
});*/

/*IMPLEMENTACION CON EXPRESS*/

const express = require("express");
const morgan = require("morgan")
const app = express();

/*SETTINGS*/
app.set("appName","Bryan Express Tutorial");
app.set("port",3000);
app.set("view engine","ejs");


app.get("/",(req,res)=>{
    const data = [{nombre:"Bryan"},{nombre:"Génesis"},{nombre:"Yojana"},{nombre:"Mackensy"}];
    res.render("index.ejs",{personas:data})
});

/*MIDDLEWARES*/
app.use(express.json());
function logger(req, res, next){
    console.log(`Request received: ${req.protocol}://${req.get("host")}${req.originalUrl}`);
    next();
}


/*ARCHIVOS ESTATICOS*/
app.use(express.static("public")); //<-middelware

app.listen(app.get("port"), (req, res) => {
    console.log(app.get("appName"));
    console.log("Server on port "+app.get("port"));
});



//app.use(logger);
app.use(morgan("tiny"))


/************************* */
app.all("/user", (req, res, next) => {
    //console.log(req);
    /*res.json({
        "message": "por aqui paso"
    })*/
    console.log("por aqui paso");
    next();
});

app.get("/", (req, res) => {
    res.send("Hello World");
});

/*CREACION DE RUTAS*/
app.get("/about", (req, res) => {
    res.send("About me");
});

app.get("/contact", (req, res) => {
    res.send("Form contact");
});

app.get("/login", (req, res) => {
    res.send("Form login");
});

/*RESOLUCION DE PETICIONES*/
app.get("/get", (req, res) => {
    res.send("METHOD GET");
});

app.post("/post", (req, res) => {
    res.send("METHOD POST");
});

app.put("/put", (req, res) => {
    res.send("METHOD PUT");
});

app.delete("/delete", (req, res) => {
    res.send("METHOD DELETE");
});

/*Otro método de enviar información*/
app.get("/user", (req, res) => {
    res.json({
        "username": "Bryan",
        "password": "123"
    });
});

app.post("/user", (req, res) => {
    res.json({
        "response": "Usuario registrado correctamente",
        "status": "200"
    });
    console.log(req.body);
});


/*RUTAS DINAMICAS*/
app.post("/user/:idUsuario", (req, res) => {
    res.json({
        "response": "Usuario registrado correctamente",
        "status": "200"
    });
    console.log(req.body);
    console.log(req.params)
});

