const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/angular-auth",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(response => console.log("database is connect!"))
.catch(error => console.error(`Ha ocurrido un error ${error}`));