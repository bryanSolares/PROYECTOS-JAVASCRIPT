const {Weather} = require("./Weather")
const {UI} = require("./UI")
const {Store} = require("./Store")
require("./index.css");


const ui = new UI();
const store = new Store();
const {city,countryCode} = store.getLocationData();
const weather = new Weather(city,countryCode);


async function fetchWeather(){
    const data = await weather.getWeather();
    ui.render(data);
}

function loadData(evento){
    evento.preventDefault();
    const city = document.getElementById("city").value;
    const countryCode = document.getElementById("country-code").value;
    weather.changeLocation(city, countryCode);
    store.setLocationData(city,countryCode);
    fetchWeather();
}

document.addEventListener('DOMContentLoaded',fetchWeather);
document.getElementById("w-change-btn").addEventListener('click',loadData);