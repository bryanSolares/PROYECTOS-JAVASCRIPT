const productSchema = require("../models/product");

function saveProduct(req, res) {
    let product = new productSchema();
    product.name = "nombre"
    product.picture = "picture"
    product.price = 12
    product.category = "accesories"
    product.description = "descripcion"

    product.save((error, productStored) => {
        if (error) res.status(500).send({
            message: `Error al grabar producto: ${error}`
        });
        res.status(200).send({
            product: productStored
        });
    });
}

function getProducts(req, res) {
    productSchema.find({}, (error, products) => {
        if (error) return res.status(500).send({
            message: `Error al realizar la petición: ${error}`
        });
        if (!products) return res.status(404).send({
            message: `No existen productos`
        });
        res.status(200).send({
            products
        });
    });
}

function getProduct(req, res) {
    let productId = req.params.productId;
    productSchema.findById(productId, (error, product) => {
        if (error) return res.status(500).send({
            message: `Error al buscar producto: ${error}`
        });
        if (!product) return res.status(404).send({
            message: `El producto no existe`
        });
        res.status(200).send({
            product
        });
    });
}

function updateProduct(req, res) {
    let productId = req.params.productId;
    let productBody = req.body;
    productSchema.findByIdAndUpdate(productId, productBody, (error, product) => {
        if (error) return res.status(500).send({
            message: `Error al actualizar el producto: ${error}`
        });
        if (!product) return res.status(404).send({
            message: `El producto no existe`
        });
        res.status(200).send(product);
    });
}

function deleteProduct(req, res) {
    let productId = req.params.productId;
    productSchema.findById(productId, (error, product) => {
        if (error) return res.status(500).send({
            message: `Error al borrar el producto: ${error}`
        });
        if (!product) return res.status(404).send({
            message: `El producto no existe`
        });
        product.remove((error) => {
            if (error) return res.status(500).send({
                message: `Error al borrar el producto: ${error}`
            });
            res.status(200).send({
                message: `El producto ha sido eliminado`
            });
        });
    });
}


module.exports = {
    saveProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}