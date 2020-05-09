const User = require("./auth.dao");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "secretkey123456";

exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }

    User.create(newUser, (error, user) => {
        
        if(error && error.code === 11000) return res.status(409).send("El email ya existe");
        
        if (error) return res.status(500).send("Server error");

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({
            id: user.id
        }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        const dataUser = {
            name:user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn
        }
        res.send({
            dataUser
        });
    });
}

exports.loginUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    User.findOne({
        email: userData.email
    }, (error, user) => {
        if (error) return res.status(500).send("Server error");
        if (!user) {
            res.status(409).send({
                message: "Algo ha salido mal"
            });
        } else {
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if (resultPassword) {
                //contraseña correcta
                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({
                    id: user.id
                }, SECRET_KEY, {
                    expiresIn: expiresIn
                });

                const dataUser = {
                    name:user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn
                }

                res.send({
                    dataUser
                });
            } else {
                //contraseña incorrecta
                res.status(409).send({
                    message: "Algo ha salido mal"
                });
            }
        }
    });
}