const express = require('express')
const bodyParser = require('body-parser'); 
let app = express.Router()
const urlencodedParser = bodyParser.urlencoded({extended: false});
var transporter = require('../nodeMailer/transport');
const { json } = require('body-parser');


app.get('/', function (req, res) {
    try {
        res.sendFile(__dirname + '/wp/index.php') 
    } catch (error) {
        console.log(error);
    }
      
});

module.exports = app