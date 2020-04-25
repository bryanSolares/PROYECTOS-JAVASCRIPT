const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/order-list",{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(response => console.log("bd is connected!"))
.catch(error => console.log(error));