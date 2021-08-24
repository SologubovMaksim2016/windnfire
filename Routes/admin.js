const express = require('express')
const bodyParser = require('body-parser'); 
let app = express.Router()
const urlencodedParser = bodyParser.urlencoded({extended: false});
var transporter = require('../nodeMailer/transport');
const { json } = require('body-parser');

app.get('/', function (req, res) {

   
    res.sendFile(__dirname + '/admin/index.html')

   
});
app.get('/tables', function (req, res) {
    debugger;

    res.sendFile(__dirname + '/admin/tables.html')

   
});

// app.get('/:id', function (req, res) {
//     res.send('View Blogs' + req.params.id);
// });

module.exports = app