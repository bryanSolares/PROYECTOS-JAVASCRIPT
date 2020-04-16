"use strict"
const mongosse = require("mongoose");
const schema = mongosse.Schema;

const productSchema = schema({
    name:String,
    picture:String,
    price:{
        type:Number,
        default:0
    },
    category: {
        type:String,
        enum:["computers","phones","accesories"],
        description:String
    }
});

module.exports = mongosse.model("Product",productSchema);

