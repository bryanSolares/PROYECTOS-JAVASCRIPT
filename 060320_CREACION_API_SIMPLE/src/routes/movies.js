const {Router} = require("express");
const router = Router();

const movies = require("../sample.json");

router.get("/",(req, res) =>{
    res.json(movies);
});

router.post("/",(req, res)=>{
    const {title, director, year, rating} = req.body;
    if(title && director && year && rating){
        res.json("saved");
    }else{
        res.send("Wrong request"); 
    }
});

module.exports = router; 