const express = require("express");
const morgan = require("morgan")
const cors = require("cors")

const app = express();

require("./database");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api", require("./routes/index.routes"));

app.listen(3000);
console.log(`Server on PORT ${3000}`);