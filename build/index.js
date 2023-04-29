"use strict";

var _app = _interopRequireDefault(require("./app.js"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
_app["default"].set("port", process.env.PORT_SERVER || 3000);
_app["default"].listen(_app["default"].set("port"), function () {
  console.log("✔️✔️   Server on port", _app["default"].set("port"), "❗");
});