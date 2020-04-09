const {Router} = require("express");
const fetch = require("node-fetch")

const router = Router();

router.get("/",async (req, res)=>{
    const response = await fetch("http://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    res.json(users);
});

module.exports = router;