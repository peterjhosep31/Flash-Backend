import mysql from 'mysql';
import dotenv from 'dotenv';

// Configuración de la conexión a la base de datos
dotenv.config();

// Creación de la conexión a la base de datos
const myConnectionDataBase = mysql.createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_USERS,
  database: process.env.DATA_BASE,
  charset: process.env.CHARSET_DB,
  port: 3306,
});

// Intentar establecer la conexión y manejar errores
try {
  myConnectionDataBase.connect((err) => {
    if (err) {
      console.log("Error base datos:  ", err);
    } else {
      console.log("✔️✔️ You are connected to the database");
    }
  });
} catch (error) {
  console.log("Error connecting to the database \n", error, "\n______________________________________-");
}

// Exportar la conexión a la base de datos como módulo
export default myConnectionDataBase;
