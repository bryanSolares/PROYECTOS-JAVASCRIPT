const mongoose = require("mongoose")

const {NOTES_APP_MONGODB_HOST,NOTES_APP_MONGODB_DATABASE} = process.env;
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex:true
})
.then(data => console.log("base de datos conectada"))
.catch(error => console.log(error));