const express = require('express')
const path = require('path');
const fs = require('fs')
const multer  = require("multer");

let app = express.Router()
var device = require('express-device');
app.use(device.capture());
app.use(multer({dest:"uploads"}).single("filedata"));


app.get('/load', function (req, res) {
    res.download(`./${req.query.name}.txt`); 
});

module.exports = app