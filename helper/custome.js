const nodemailer = require('nodemailer');
const fs = require('fs')

async function sendEmail(sendto, subject, message,path) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: 'put your email id', 
      pass: 'put your password here', 
    },
  });
  let info = await transporter.sendMail({
    from: subject,
    to: sendto, 
    subject: subject,
    html: message,
    attachments: [
      {
          path: path ,
      }
  ]
  });

}

module.exports = { sendEmail };
