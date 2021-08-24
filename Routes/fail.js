const express = require('express')
const bodyParser = require('body-parser'); 
let app = express.Router()
const urlencodedParser = bodyParser.urlencoded({extended: false});
var transporter = require('../nodeMailer/transport');
const { json } = require('body-parser');


var device = require('express-device');
app.use(device.capture());

app.get('/', function (req, res) {
    if ( req.device.type.toUpperCase() == "DESKTOP") { res.sendFile(__dirname + '/desktop/404.html')}
    else  res.sendFile(__dirname + '/mobile/404.html')      
});
module.exports = app