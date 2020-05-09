const express = require("express");
const app = express();

app.listen(3000);

app.all("/secret",function(req,res,next){
    console.log("Accediendo a la sección secreta.....");
    next();
});

app.get("/",function(req,res){
    res.send("Petición a /");
});

app.post("/post",function(req,res){
    res.send("Petición a /post");
});

app.get("/secret",function(req,res){
    res.send("Peticion a /secret")
});

app.get("/conpunto.",function(req,res){
    res.send("Petición a ruta /conpunto.")
});

//con expression regular
app.get('/ab?cd', function (req, res) {
    res.send('ab?cd')
});

//Todas las rutas con a
/*app.get(/a/, function (req, res) {
    res.send('/a/')
});*/

//Rutas con parámetros
app.get("/users/:userId/books/:bookId",function(req,res){
    res.send(req.params);
});

app.get("/aviones/:de-:a",function(req,res){
    res.send(req.params);
});

app.get("/plantas/:nombre.:especie",function(req,res){
    res.send(req.params);
});


//Rutas controladas con middlwares
var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  var cb2 = function (req, res) {
    res.send('Hello from C!')
  }
  
app.get('/controlada', [cb0, cb1, cb2])


var cb0 = function (req, res, next) {
    console.log('CB0')
    next()
  }
  
  var cb1 = function (req, res, next) {
    console.log('CB1')
    next()
  }
  
  app.get('/controlada/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...')
    next()
  }, function (req, res) {
    res.send('Hello from D!')
  })