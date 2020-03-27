const express = require("express");
const router = express.Router();
const passport = require("passport");
<<<<<<< HEAD
const {isLoggedIn, isNotLoggedIn} = require("../lib/auth")
=======
const {
    isLoggedIn, isNotLoggedIn
} = require("../lib/auth")
>>>>>>> 9ba79bcd36dfce8cc4b662ea5fb4ae32de639657

router.get("/singup", isNotLoggedIn, (req, res) => {
    res.render("auth/singup")
});
/*
router.post("/singup", (req, res) => {
    passport.autheticate("local.singup", {
        successRedirect: "/profile",
        failureRedirect: "/signup",
        failureFlash: true
    });
    res.send("Recibido");
});
*/

//Esto viaje a passport
router.post("/singup",  isNotLoggedIn, passport.authenticate("local.singup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
}));

router.get("/singin",  isNotLoggedIn, (req, res) => {
    res.render("auth/singin")
});

router.post("/singin",  isNotLoggedIn, (req, res, next) => {
    passport.authenticate("local.singin", {
        successRedirect: "/profile",
        failureRedirect: "/singin",
        failureFlash: true
    })(req, res, next);
});

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile");
})

router.get("/logout",  isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect("/singin")
});

module.exports = router;