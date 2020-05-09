const express = require("express");
const router = express.Router();
const app = express();

//Middlewares a nivel de aplicación
/******************************/

/*app.use(function(req,res,next){
    console.log("Time:",Date.now());
    next();
});

app.use("/user/:id",function(req,res,next){
    console.log("Request Type:",req.method);
    next();
});

app.get("/user/:id",function(req,res,next){
    res.send("User");
});
*/


//en pila


/*app.get('/user/:id', function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id === '0') next('route') // ->omite el resto de middlewares de la pila y pasa a la siguiente ruta coincidiente
    //  solo es funcional, app.METHOD() ó router.METHOD()

    // otherwise pass the control to the next middleware function in this stack
    else next()
  }, function (req, res, next) {
    // send a regular response
    res.send('regular')
  })
  
  // handler for the /user/:id path, which sends a special response
  app.get('/user/:id', function (req, res, next) {
    res.send('special')
  })
*/


//en matríz

/*
function logOriginalUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
  }
  
  function logMethod (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  }
  
  var logStuff = [logOriginalUrl, logMethod]
  
  app.get('/user/:id', logStuff, function (req, res, next) {
      console.log("final")
    res.send('User Info')
  })
*/

/******************************/
//Middleware a nivel de enrutador

/*
router.use(function(req,res,next){
    console.log("Time:",Date.now());
    next();
})

router.use("/user/:id",function(req,res,next){
    console.log("Request URL:",req.originalUrl);
    next();
},function(req,res,next){
    console.log("METHOD:",req.method);
    next();
});

router.get("/user/:id",function(req,res,next){
    if(req.params.id === '0') next("route")
    else next()
},function(req,res,next){
    res.send("regular")
});

router.get("/user/:id",function(req,res,next){
    console.log(req.params.id);
    res.send("special")
});

app.use("/",router);


// predicate the router with a check and bail out when needed
router.use(function (req, res, next) {
    if (!req.headers['cookie']) return next('router')
    next()
  })
  
  router.get('/user/:id', function (req, res) {
    res.send('hello, user!')
  })
  
  // use the router and 401 anything falling through
  app.use('/admin', router, function (req, res) {
    res.sendStatus(401)
  })*/

  /*****************************/
  //MIDDELWARES DE ERRORES

 /* app.use(function(err, req,res, next){
    console.error(err.stack);
    res.status(500).send("Algo ha salido mal")
  });

  app.get("/",(req,res)=>{
      res.send("sdad")
  })*/


app.listen(3000);
console.log("Server on port 3000")
