const express = require('express')

let app = express.Router()

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/slides/slides.html')    
});
module.exports = app