const userSchema = require("../models/user");
const service = require("../service/index");
const user = require("../models/user");

function signUp(req, res) {

    const user = new userSchema({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    });

    user.avatar = user.gravatar();

    user.save((error) => {
        if (error) return res.status(500).send({
            message: `Error al crear el usuario!!! error: ${error}`
        });

        return res.status(201).send({
            token: service.createToken(user)
        });
    });
}

function signIn(req, res) {
    user.find({
        email: req.body.email
    }, (error, user) => {
        if (error) return res.status(500).send({
            message: error
        });
        if (!user) return res.status(404).send({
            message: "No existe el usuario"
        });
        req.user = user;
        res.status(200).send({
            message: "Te has logueado correctamente",
            token: service.createToken(user)
        })
    });
}

module.exports = {
    signUp,
    signIn
}