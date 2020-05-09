const express = require("express");
const app = express();

let isLogin = ()=> true;
let log = (req, res, next)=>{
    console.log("Petición de tipo:",req.method);
    next()
};

let showIP = (req,res,next)=>{
    console.log("IP: 127.0.0.1");
    next();
}


app.use((req,res,next)=>{
    console.log("Estoy procesando antes de continuar"),
    console.log(req.headers);
    next();
});

app.use((req, res, next)=>{
    console.log("Estoy pasando por otro middleware");
    if(isLogin()){
        next();
    }else{
        res.send("Debes loguearte antes");
    }
},log,showIP);

//app.use(log);

app.get("/",(req,res)=>{
    res.send("Peticion Recibida")
});

app.listen(3000,()=>{
    console.log("Server on port 3000");
});