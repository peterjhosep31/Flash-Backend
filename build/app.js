"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
require("./config/dataBase/dataBase.js");
var _routes = _interopRequireDefault(require("./routes/routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.get("/", function (req, res) {
  return res.json({
    message: "Welcome to my application",
    name: "Flash-Bakend",
    author: "Team_Developer_Flash",
    description: "Proyecto formativo",
    version: "1.0.0"
  });
});
app.use("/api", _routes["default"]);
var _default = app;
exports["default"] = _default;