import mysql from 'mysql';
import dotenv from 'dotenv';

// Configuración de la conexión a la base de datos
dotenv.config();

// Creación de la conexión a la base de datos
const myConnectionDataBase = mysql.createConnection({
    host: 'bez5f6lyzt5s0fjsqegf-mysql.services.clever-cloud.com',
    user: 'uryc28gay4afg17f',
    password: 'AnTQv7J9bN3KNZMWwcKk',
    database: 'bez5f6lyzt5s0fjsqegf',
    port: 3306
});

const maxConnectionAttempts = 5; // Número máximo de intentos de conexión
let connectionAttempts = 0; // Contador de intentos de conexión

// Función para intentar establecer la conexión
function tryConnect() {
    myConnectionDataBase.connect((err) => {
        if (err) {
            console.log("Error base datos: ", err);
            if (connectionAttempts < maxConnectionAttempts) {
                connectionAttempts++;
                console.log(`Intento de conexión número ${connectionAttempts}`);
                setTimeout(tryConnect, 5000); // Espera 3 segundos antes de intentar nuevamente
            } else {
                console.log(`Se alcanzó el número máximo de intentos (${maxConnectionAttempts}). No se pudo establecer la conexión.`);
            }
        } else {
            console.log("✔️✔️ You are connected to the database");
        }
    });
}

// Intentar establecer la conexión
tryConnect();

export default myConnectionDataBase;
