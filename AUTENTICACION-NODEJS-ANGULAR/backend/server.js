"user strict"
const cors = require("cors")
const express = require("express");
const authRoutes = require("./src/auth/auth.routes");
const properties = require("./src/config/properties");
const DB = require("./src/config/db");
const body_parser = require("body-parser");

DB();

const app = express();
const router = express.Router();

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(cors());
app.use("/api",router);

authRoutes(router);
router.get("/",(req, resp)=>{
    resp.send("Hola desde Node")
});

app.use(router);

app.listen(properties.PORT,()=>{
    console.log(`Server running on port ${properties.PORT}`);
});