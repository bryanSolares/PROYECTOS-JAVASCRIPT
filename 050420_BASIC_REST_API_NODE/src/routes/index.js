const {Router} = require("express");

const router = Router();

router.get("/",(req, res)=>{
    res.json({mensaje:"Peticion recibida"});
});

module.exports = router;