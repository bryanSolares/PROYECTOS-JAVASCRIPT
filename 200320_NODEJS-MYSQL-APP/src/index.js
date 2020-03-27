const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars")
const path = require("path")
const flash = require("connect-flash")
const session = require("express-session")
const mysql_store = require("express-mysql-session")
const {database} =  require("./keys")
const passport = require("passport")

/**
 * 
 * 
 * 
 */
const app = express();
require("./lib/passport")



/**
 * 
 * 
 * 
*/


//settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"))
app.engine(".hbs", exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars")
}));

app.set("view engine", ".hbs");


/**
 * 
 * 
 * 
 */
//middlewares
app.use(session({
    secret:"Bryan",
    resave: false,
    saveUninitialized: false,
    store: new mysql_store(database)
}));
app.use(flash());
app.use(morgan("dev"));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session())
/**
 * 
 * 
 * 
 * 
 */
//global varibles
app.use((req,res,next)=>{
    app.locals.success = req.flash("success");
    app.locals.message = req.flash("message");
    app.locals.user = req.user;
    next();
});

/**
 * 
 * RUTAS A LAS QUE LOS USUARIOS PUEDEN ACCEDER
 * 
 */
//routes
app.use(require("./routes"));
app.use(require("./routes/authentication"));
app.use("/links",require("./routes/links"));

/**
 * 
 * 
 * 
 */

//public
app.use(express.static(path.join(__dirname,"public")));


/**
 * 
 * 
 * 
 */
//Starting
app.listen(app.get("port"), () => {
    console.log(`Server on Port ${app.get("port")}`)
});