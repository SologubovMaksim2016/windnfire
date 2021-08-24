
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {    
    user: 'hello.windnfire@gmail.com',
    pass: 'Bvxs394Z4K'
  }
 
});

// let transporter = nodemailer.createTransport({
//   host: 'smtp.ethereal.email',
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//       user: account.user, // generated ethereal user
//       pass: account.pass  // generated ethereal password
//   }
// });

module.exports = transporter;


