"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mysql = _interopRequireDefault(require("mysql"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
var myConnectionDataBase = _mysql["default"].createConnection({
  host: process.env.HOST_DB,
  user: process.env.USER_DB_ADMIN,
  password: process.env.PASSWORD_DB_ADMIN,
  database: process.env.DATA_BASE,
  charset: process.env.CHARSET_DB,
  port: process.env.PORT_DB
});
myConnectionDataBase.connect(function (err) {
  if (err) {
    console.log("Error connecting to the database \n", err, "\n______________________________________-");
    return;
  } else {
    console.log("✔️✔️   You are connected to the database");
  }
});
var _default = myConnectionDataBase;
exports["default"] = _default;