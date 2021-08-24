const express = require('express')
const path = require('path');
const fs = require('fs')
const mysql = require("mysql2");

let app = express.Router()
var device = require('express-device');
app.use(device.capture());



app.post('/load', function (req, res) {
     const data = JSON.parse(fs.readFileSync('./data.json')).data;
     res.send(data)   
});
app.get('/save', function (req, res) {
     res.send('OK')
    try {
         let data = JSON.parse(fs.readFileSync('./data.json')).data;  
    let defiValue = req.query.defi == 'true'? 1:0
    let developmentValue = req.query.development == 'true'? 1:0
    data.defi = +data.defi + defiValue
    data.development = +data.development + developmentValue
    let el = {data: data}
    fs.writeFileSync('./data.json', JSON.stringify(el)); 
    } catch (error) {
         res.send(error)
    }
});
module.exports = app