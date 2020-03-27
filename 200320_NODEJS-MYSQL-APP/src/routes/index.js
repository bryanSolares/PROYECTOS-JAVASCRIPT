const express =  require("express")
const router = express.Router();


/*
    RUTA INICIAL DE LA APLICACION
*/
router.get("/",(req,res)=>{
    res.render('index');
});

module.exports = router;