import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const myConnectionDataBase = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_USERS,
    database: 'flash1',
    charset: process.env.CHARSET_DB,
    port: 3306,
});

try {
    myConnectionDataBase.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("✔️✔️ You are connected to the database");
        }
    });
} catch (error) {
    console.log("Error connecting to the database \n", error, "\n______________________________________-");
}


export default myConnectionDataBase;