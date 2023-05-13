import nodemailer from 'nodemailer';


const configEmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "2022.flash.sale@gmail.com",
    pass: 'hgrhllbhrxposmso',
  },
});


export default configEmail;