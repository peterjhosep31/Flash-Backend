"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mysql = _interopRequireDefault(require("mysql"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Configuración de la conexión a la base de datos
_dotenv["default"].config();

// Creación de la conexión a la base de datos
var myConnectionDataBase = _mysql["default"].createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_USERS,
  database: process.env.DATA_BASE,
  charset: process.env.CHARSET_DB,
  port: 3306
});
var maxConnectionAttempts = 3; // Número máximo de intentos de conexión
var connectionAttempts = 0; // Contador de intentos de conexión

// Función para intentar establecer la conexión
function tryConnect() {
  myConnectionDataBase.connect(function (err) {
    if (err) {
      console.log("Error base datos: ", err);
      if (connectionAttempts < maxConnectionAttempts) {
        connectionAttempts++;
        console.log("Intento de conexi\xF3n n\xFAmero ".concat(connectionAttempts));
        setTimeout(tryConnect, 3000); // Espera 3 segundos antes de intentar nuevamente
      } else {
        console.log("Se alcanz\xF3 el n\xFAmero m\xE1ximo de intentos (".concat(maxConnectionAttempts, "). No se pudo establecer la conexi\xF3n."));
      }
    } else {
      console.log("✔️✔️ You are connected to the database");
    }
  });
}

// Intentar establecer la conexión
tryConnect();
var _default = myConnectionDataBase;
exports["default"] = _default;