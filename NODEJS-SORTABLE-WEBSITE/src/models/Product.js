const {
    Schema,
    model
} = require("mongoose")

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    sorting: {
        type: Number,
        default:0
    }
});

module.exports = model("Product", productSchema);