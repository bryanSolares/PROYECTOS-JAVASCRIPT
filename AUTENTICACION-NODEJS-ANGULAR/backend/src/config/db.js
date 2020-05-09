const mongoose = require("mongoose")
const dbURL = require("./properties").DB;

module.exports = ()=>{
    mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log(`Mongo is connect on ${dbURL}`))
    .catch(error=>console.error(`Connection has error ${error}`));

    process.on("SIGINT",()=>{
        mongoose.connection.close(()=>{
            console.log(`Mongo is disconnected`);
            process.exit(0);
        });
    });
}