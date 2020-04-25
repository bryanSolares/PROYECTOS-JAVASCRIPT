const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/User");

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("hola");
});

router.post("/signup",async (req,res)=>{
    
    const {email, password} = req.body;
    const newUser = new userModel({email,password});
    await newUser.save();
    
    const token = jwt.sign({_id: newUser._id},"secretKey");
    res.json({token});
});

router.post("/signin",async(req,res)=>{
    const {email, password } = req.body;
    const user = await userModel.findOne({email});

    if(!user) return res.status(400).send("El correo no existe");
    if(user.password !== password) return res.status(400).send("El correo no existe");

    const token = jwt.sign({_id:user._id},"secretKey");
    return res.status(200).json({token});

});

router.get("/tasks",async(req,res)=>{
    res.status(200).json();
});

router.get("/private/tasks", verifiToken, async(req,res)=>{
    res.status(200).json();
});


function verifiToken(req, res, next){
    if(!req.headers.authorization) return res.status(401).send("Petición no autorizada");
    const token = req.headers.authorization.split(" ")[1];
    if(token === "null") return res.status(401).send("Petición no autorizada");

    const payload = jwt.verify(token,"secretKey");
    req.userId = payload._id;
    next();
}

module.exports = router;