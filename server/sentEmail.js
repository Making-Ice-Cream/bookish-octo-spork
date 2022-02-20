const path = require("path");
const nodemailer = require('nodemailer');
const fs = require("fs");
const handlebars = require('handlebars');
const smtpTransport = require('nodemailer-smtp-transport');

 async function sendEmail(email, subject, filePath, replacements) {
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const htmlToSend = template(replacements);
    const transporter = nodemailer.createTransport({
      service:"gmail",
      secure: false,
      auth: {
        user: "noreply.5671@gmail.com",
        pass: "Apni@123"
      }
    });
    const mailOptions = {
      from: "noreply.5671@gmail.com",
      to: email,
      subject: subject,
      html: htmlToSend
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  }
  module.exports = { sendEmail };