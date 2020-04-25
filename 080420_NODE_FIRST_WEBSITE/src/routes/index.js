const {Router} = require("express")

const router = Router();

router.get("/",(req, resp)=>{
    //resp.json({message:"Petición recibida"});
    //resp.sendFile(path.join(__dirname,"views/index.html"));
    resp.render("index.html",{title:"Primer Proyecto"});
});

router.get("/contact",(req, resp)=>{
    resp.render("contact.html",{title:"Contact Page"});
});

router.get("/about",(req, resp)=>{
    resp.render("about.html",{title:"About Page"});
});

module.exports = router;