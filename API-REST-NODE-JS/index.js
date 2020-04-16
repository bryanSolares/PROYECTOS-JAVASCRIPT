
const mongoose = require("mongoose");
const app = require("./app");
const {port,db} = require("./config");

//Server and DataBase
mongoose.connect(db, (error, response) => {
    if (error) return `Error al conectar a la base de datos: ${error}`;
    console.log(`Conexión a la base de datos establecida...`);

    //Starting Server
    app.listen(port, () => {
        console.log(`API REST corriendo en localhost:${port}`);
    });
});



