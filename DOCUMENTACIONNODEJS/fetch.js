const fetch = require("node-fetch");

let promise = fetch("https://api.github.com/users/bryansolares")

promise.then(result => {return result.json()})
.then(response => console.log(response))
.catch(error => console.error(error));