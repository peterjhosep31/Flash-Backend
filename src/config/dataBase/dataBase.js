import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();



const myConnectionDataBase = mysql.createConnection({
  host: process.env.hostDB,
  user: "flash",
  password: "zhaTatBonnNic",
  database: 'flash',
  charset: process.env.charsetDB,
  port: process.env.portDB,
});

myConnectionDataBase.connect((err) => {
    if (err) {
        console.log("Error connecting to the database \n", err, "\n______________________________________-");
        return;
    } else {
        console.log("You are connected to the database")
    }
})

export default myConnectionDataBase;