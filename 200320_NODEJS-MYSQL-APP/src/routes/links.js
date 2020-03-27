const express = require("express");
const router = express.Router();
const pool = require("../database");
const {isLoggedIn} = require("../lib/auth")

<<<<<<< HEAD


/**
 * SOLICITUD PARA IR A AGREGAR UN ENLACE
 */
=======
>>>>>>> 9ba79bcd36dfce8cc4b662ea5fb4ae32de639657
router.get("/add", isLoggedIn, (req, resp)=>{
    resp.render("links/add")
}); 

<<<<<<< HEAD
/**
 * PETICION PARA AGREGAR UN NUEVO ENLACE
 */
=======
>>>>>>> 9ba79bcd36dfce8cc4b662ea5fb4ae32de639657
router.post("/add", isLoggedIn, async(req, res)=>{
    const {title, url, description} =  req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    }; 
    await pool.query("INSERT INTO links SET ?",[newLink]);
    req.flash("success","Link saved successfully");
    res.redirect("/links");
}); 

<<<<<<< HEAD
/*
 * SOLICITUD PARA VISUALIZAR TODOS LOS ENLACES
 */
=======
>>>>>>> 9ba79bcd36dfce8cc4b662ea5fb4ae32de639657
router.get("/", isLoggedIn, async(req, res)=>{
    const links = await pool.query("SELECT * FROM links WHERE user_id = ?",[req.user.id]);
    res.render("links/list",{links});
})

<<<<<<< HEAD
/**
 * SOLICITUD PARA ELIMINAR UN ENLACE
 */
=======
>>>>>>> 9ba79bcd36dfce8cc4b662ea5fb4ae32de639657
router.get("/delete/:id", isLoggedIn, async(req,res)=>{
    const {id} = req.params;
    await pool.query("DELETE FROM links WHERE id = ?",[id]);
    req.flash("success","Link removed successfully")
    res.redirect("/links");
});

<<<<<<< HEAD
/**
 * SOLICITUD PARA LLAMAR AL ENLACE QUE SE DESEA MODIFICAR
 */
=======
>>>>>>> 9ba79bcd36dfce8cc4b662ea5fb4ae32de639657
router.get("/edit/:id", isLoggedIn, async(req,res)=>{
    const {id} = req.params;
    const link = await pool.query("SELECT * FROM links WHERE id = ?",[id]);
    res.render("links/edit",{link:link[0]});
});

<<<<<<< HEAD
/**
 * SOLICITUD PARA MODIFICAR EN ENLACE
 */
=======
>>>>>>> 9ba79bcd36dfce8cc4b662ea5fb4ae32de639657
router.post("/edit/:id", isLoggedIn, async(req,res)=>{
    const {id} = req.params;
    const {title, url, description} = req.body;
    const newLinks ={
        title,
        description,
        url
    };
    await pool.query("UPDATE links set ? WHERE id = ?",[newLinks,id]);
    req.flash("success","Link updated successfully")
    res.redirect("/links");    
});

module.exports = router;