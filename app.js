import express from 'express';
import myConnection from 'express-myconnection';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

import routes from './src/routes/routes.js'


const app = express();
dotenv.config();

app.use(routes)

app.set('port', process.env.PORT || 3000);
app.use(express.json());


let confiDB = {
    host: process.env.hostDb,
    db: process.env.db,
    user: process.env.userDb,
    password: process.env.passwordDB,
    port: process.env.portDB
}

const configEmail = nodemailer.createTransport({
    host: process.env.hostEmail,
    port: process.env.portEmail,
    auth : {
        user: process.env.user_email,
        pass: process.env.password_email
    }
})

try {
    app.use(myConnection(mysql, confiDB, 'single'));
    console.log('data base is connect');
} catch (error) {
    console.log("________________________CONNECT DATA BASE _______________________________");
    console.log(error);
    console.log("_________________________________________________________________________");
}

app.listen(app.set('port'), () => {
    console.log('Server on port', app.set('port'));
});


export default configEmail;