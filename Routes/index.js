const express = require('express')
const bodyParser = require('body-parser'); 
let app = express.Router()
const urlencodedParser = bodyParser.urlencoded({extended: false});
var transporter = require('../nodeMailer/transport');
const { json } = require('body-parser');



app.get('/', function (req, res) {
   if ( req.device.type.toUpperCase() == "DESKTOP") { res.sendFile(__dirname + '/desktop/index.html')}
   else  res.sendFile(__dirname + '/mobile/index.html')   
});

module.exports = app