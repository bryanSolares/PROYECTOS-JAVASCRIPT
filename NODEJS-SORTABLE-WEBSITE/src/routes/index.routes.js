const {Router} = require("express")
const productModel = require("../models/Product")

const route = Router();

route.get("/",async(req,res)=>{
    const products =await productModel.find({}).sort("sorting");
    res.render("index",{products});
});

route.post("/add-product",async(req,res)=>{
    const newProduct = new productModel(req.body);
    await newProduct.save()
    res.redirect("/");
});

route.post("/products/ordering",(req,res)=>{
    const ids = req.body["id[]"]
   ids.forEach(async (id,index) =>{
        const product = await productModel.findById(id);
        product.sorting = index;
        await product.save();
    });
    res.send("Ordenado");
});

module.exports = route;