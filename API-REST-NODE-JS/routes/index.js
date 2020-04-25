const express = require("express");
const controllerProduct = require("../controllers/product")
const controllerUser = require("../controllers/user")
const auth = require("../middlewares/auth")

const api = express.Router();


api.post("/product", auth, controllerProduct.saveProduct);
api.get("/product", controllerProduct.getProducts);
api.get("/product/:productId", controllerProduct.getProduct);
api.put("/product/:productId", auth, controllerProduct.updateProduct);
api.delete("/product/:productId", auth, controllerProduct.deleteProduct);

api.post("/signup", controllerUser.signUp);
api.post("/signin", controllerUser.signIn);

api.get("/private", auth, (req, res) => {
    res.status(200).send({
        message: "Tienes acceso"
    });
}); 

module.exports = api;