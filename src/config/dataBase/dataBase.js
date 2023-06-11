import mysql from 'mysql2';
import dotenv from 'dotenv';

// Configuración de la conexión a la base de datos
dotenv.config();

// Creación de la conexión a la base de datos
const myConnectionDataBase = mysql.createConnection({
    host: 'containers-us-west-130.railway.app',
    user: 'root',
    password: '9RNDxjEv97quu96RdA7y',
    database: 'railway',
    port: 6757
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
