
const express = require('express')
const bodyParser = require('body-parser'); 
let app = express.Router()
const urlencodedParser = bodyParser.urlencoded({extended: false});
var transporter = require('../nodeMailer/transport');
const { json } = require('body-parser');

const path = require('path');
var device = require('express-device');
app.use(device.capture());



app.get('/', function (req, res) {
    
    if ( req.device.type.toUpperCase() == "DESKTOP") { res.sendFile(__dirname + '/desktop/blogs/blog.html')}
    else  res.sendFile(__dirname + '/mobile/blogs/blog.html')
    
});

app.get('/:id', function (req, res) {
    if ( req.device.type.toUpperCase() == "DESKTOP") { 
        res.sendFile(path.resolve(__dirname + '/desktop/blogs/blog'+ req.params.id +'.html'), (err) => {
            if (err) return res.sendFile(__dirname + '/desktop/404.html');
            res.sendFile(__dirname + '/desktop/blogs/blog'+ req.params.id +'.html')
          });    
    }
    else {
        res.sendFile(path.resolve(__dirname + '/mobile/blogs/blog'+ req.params.id +'.html'), (err) => {
            if (err) return res.sendFile(__dirname + '/mobile/404.html');
            res.sendFile(__dirname + '/mobile/blogs/blog'+ req.params.id +'.html')
        }); 
    } 
});
module.exports = app