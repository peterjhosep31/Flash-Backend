import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();



const myConnectionDataBase = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB_ADMIN,
  password: process.env.PASSWORD_DB_ADMIN,
  database: process.env.DATA_BASE,
  charset: process.env.CHARSET_DB,
  port: process.env.PORT_DB,
});

myConnectionDataBase.connect((err) => {
    if (err) {
        console.log("Error connecting to the database \n", err, "\n______________________________________-");
        return;
    } else {
        console.log("✔️✔️   You are connected to the database")
    }
})

export default myConnectionDataBase;