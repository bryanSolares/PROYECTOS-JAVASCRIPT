const express = require("express")
const app = express();
const router = express.Router();

router.use(function timeLog(req,res,next){
    console.log("Time:",Date.now());
    next();
})
.get("/",function(req, res){
    res.send("Birds home page");
})
.get("/about",function(req,res){
    res.send("About birds");
});


/*
router.get("/",function(req,res){
    res.send("Birds home page");
});

router.get("/about",function(req,res){
    res.send("About birds");
});
*/
app.use("/birds",router);

app.listen(3000,()=>{
    console.log("Server on port 3000")
});