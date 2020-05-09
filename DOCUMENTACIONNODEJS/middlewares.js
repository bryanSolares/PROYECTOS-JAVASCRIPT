const express = require("express");
const morgan = require("morgan");
const app = express();
const cookieParser = require("cookie-parser")

app.use(morgan("dev"));
app.use(cookieParser());

var myLogger = function (req, res, next) {
    console.log("LOGGED");
    next();
}

var requestTime = function (req, res, next) {
    req.requestTime = Date.now();
    next();
};

async function cookieValidator(cookies){
    try {
        await externallyValidateCookie(cookies.testCookie);
    } catch{
        throw new Error("Cookie Inválida");
    }
}

app.use(myLogger);
app.use(requestTime);

app.get("/", function (req, res) {
    var responseText = 'Hello World!<br>'
    responseText += '<small>Requested at: ' + req.requestTime + '</small>'
    console.log(JSON.stringify(req.cookies));
    console.log(req.signedCookies);
    res.send(responseText)
});


app.listen(3000, () => {
    console.log("Server on port 3000")
});