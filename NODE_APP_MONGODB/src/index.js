const app = require("./server");
require("dotenv").config();
require("./database");



//Run server
app.listen(app.get("port"),()=>console.log(`Server on port ${app.get("port")}`));