const express = require('express')
const bodyParser = require('body-parser'); 
let app = express.Router()
const urlencodedParser = bodyParser.urlencoded({extended: false});
var transporter = require('../nodeMailer/transport');
const { json } = require('body-parser');

const fs = require('fs')
const cheerio = require('cheerio');
const read = require('read-css')
app.get('/', function (req, res) {

    if ( req.device.type.toUpperCase() == "DESKTOP") { res.sendFile(__dirname + '/desktop/portfolio.html')}
    else  res.sendFile(__dirname + '/mobile/portfolio.html') 
});
module.exports = app