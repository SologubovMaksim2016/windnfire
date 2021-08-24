var express = require('express');
var app = express();
const fail = require('./Routes/fail')
const index = require('./Routes/index')
const admin = require('./Routes/admin')
const slides = require('./Routes/slides')
const blog = require('./Routes/blog')
const data = require('./Routes/data')
const files = require('./Routes/files')
const sendmail = require('./Routes/sendmail')
const portfolio = require('./Routes/portfolio')
const services = require('./Routes/services')
const wp = require('./Routes/wp')
const bodyParser  = require('body-parser');
const mysql = require("mysql2");
const fs = require('fs')
const config = JSON.parse( fs.readFileSync('config.json'));
const path = require('path');
const php = require("node-php");
// const phpServer = require('node-php-server');
app.use('/', express.static(path.join(__dirname, '/')))
app.use('/css', express.static(path.join(__dirname, '/css')))
app.use('/blog', express.static(path.join(__dirname, '/blog')))
app.use('/admin', express.static(path.join(__dirname, '/admin')))
app.use('/slides', express.static(path.join(__dirname, '/slides')))
app.use('/fonts', express.static(path.join(__dirname, '/fonts')))
app.use('/img', express.static(path.join(__dirname, '/img')))
app.use('/js', express.static(path.join(__dirname, '/js')))
app.use('/libs', express.static(path.join(__dirname, '/libs')))
app.use('/svg', express.static(path.join(__dirname, '/svg')))
app.use('/svg_mobile', express.static(path.join(__dirname, '/svg_mobile')))
app.use('/index.html', express.static(path.join(__dirname, '/index.html')))

app.use("/wp", php.cgi("/wp"));

var device = require('express-device');
app.use(device.capture());
let transporter = require('./nodeMailer/transport');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



// phpServer.createServer({
//   port: 8000,
//   hostname: '127.0.0.1',
//   base: '.',
//   keepalive: false,
//   open: false,
//   bin: 'php',
//   router: __dirname + '/wp/index.php'
// });




//Routes

app.use('/admin',admin)
app.use('/slides',slides)
app.use('/portfolio', portfolio)
app.use('/services', services)
app.use('/wp', wp)
app.use('/blog', blog)
app.use('/data', data)
app.use('/files', files)
app.use('/sendmail', sendmail)


app.use('/',index)
app.use('*',fail)







app.listen(3020, function () {
  console.log('Listening to Port 3020');
});

// app.use(function(req,res){
//   res.status(404).render('*');
// });