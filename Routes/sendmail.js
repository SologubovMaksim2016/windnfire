const express = require('express')
// const bodyParser = require('body-parser'); 
let app = express.Router()
let transporter = require('../nodeMailer/transport');
const { json } = require('body-parser');
const path = require('path');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());



app.get('/',  function (req, res) {
    let formData; 
    try {
        formData = JSON.parse(Object.keys(req.query)[0]);
    } catch (error) {
        formData = {"defi":"NO",
                    "development":"NO",
                    "timeframes": "",
                    "check_usa":"NO",
                    "check-lat-am":"NO",
                    "check_can":"NO",
                    "check_afr":"NO",
                    "check_asia":"NO",
                    "check_eur":"NO",
                    "check_rus":"NO",
                    "check_aus":"NO",
                    "check_dark-net":"NO",
                    "check-ww":"NO",
                    "GotExp": "NO",
                    "NoExp":"NO",
                    "budget": "",
                    "traffic":"NO",
                    "community":"NO",
                    "shilling":"NO",
                    "influencers":"NO",
                    "posting":"NO",
                    "pr":"NO",
                    "consulting":"NO",
                    "development_list":"NO",
                    "telegram":"",
                    "email":"",
                    "phone":"",
                    "message":"",
                    "name":""}
    }

    let emailText = ''
    try {
        emailText += formData.defi == "NO" ? `` :  `    defi: ${formData.defi}<br>`
        emailText += formData.development == "NO" ? `` :  `    development: ${formData.development}<br>`
        emailText += formData.timeframes == "" ? `` :  `    timeframes: ${formData.timeframes}<br>`
        emailText += formData.check_usa == "NO" ? `` :  `    USA: ${formData.check_usa}<br>`
        emailText += formData['check-lat-am'] == "NO" ? `` :  `    LAT  AMERICA: ${formData['check-lat-am']}<br>`
        emailText += formData.check_can == "NO" ? `` :  `    CANADA: ${formData.check_can}<br>`
        emailText += formData.check_afr == "NO" ? `` :  `    AFRICA: ${formData.check_afr}<br>`
        emailText += formData.check_asia == "NO" ? `` :  `    ASIA: ${formData.check_asia}<br>`
        emailText += formData.check_eur == "NO" ? `` :  `    EUROPE: ${formData.check_eur}<br>`
        emailText += formData.check_rus == "NO" ? `` :  `    RUSSIA: ${formData.check_rus}<br>`
        emailText += formData.check_aus == "NO" ? `` :  `    AUSTRALIA: ${formData.check_aus}<br>`
        emailText += formData['check_dark-net'] == "NO" ? `` :  `    DARK_NET: ${formData['check_dark-net']}<br>`

        emailText += formData.GotExp == "NO" ? `` :  `    GotExp: ${formData.GotExp}<br>`
        emailText += formData.NoExp == "NO" ? `` :  `    NoExp: ${formData.NoExp}<br>`
        emailText += formData.budget == ""? `` : formData.budget =="0" ? `` :  `    budget: ${formData.budget}<br>`
        emailText += formData.traffic == "NO" ? `` :  `    traffic: ${formData.traffic}<br>`
        emailText += formData.community == "NO" ? `` :  `    community: ${formData.community}<br>`
        emailText += formData.shilling == "NO" ? `` :  `    shilling: ${formData.shilling}<br>`
        emailText += formData.influencers == "NO" ? `` :  `    influencers: ${formData.influencers}<br>`
        emailText += formData.posting == "NO" ? `` :  `    posting: ${formData.posting}<br>`
        emailText += formData.pr == "NO" ? `` :  `    pr: ${formData.pr}<br>`
        emailText += formData.consulting == "NO" ? `` :  `    consulting: ${formData.consulting}<br>`
        emailText += formData.development_list == "NO" ? `` :  `    development2: ${formData.development_list}<br>`

        emailText += formData.telegram == "" ? `` :  `    telegram: ${formData.telegram}<br>`
        emailText += formData.email == "" ? `` :  `    email: ${formData.email}<br>`
        emailText += formData.message =="" ? `` :  `    message: ${formData.message}<br>`
        emailText += formData.name == "" ? `` :  `    name: ${formData.name}<br>`
    } catch (error) {}
    if(formData.telegram.length < 3) return res.send("NO TELEGRAM"); 
    else{
        let result;
        if(emailText.length > 5)
        result = transporter.sendMail({
                from: 'hello.windnfire@gmail.com',
                to: 'Nik.kristov@gmail.com, info@windnfire.com, admin@windnfire.com', 
                subject: 'Request from Windnfire.com',        
                text: emailText,
                html: emailText,
        })
        return res.send("OK")
    }      
});

module.exports = app