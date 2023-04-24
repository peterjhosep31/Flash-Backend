"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = validateToken;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
function validateToken(req, res, next) {
  var accessToken = req.header["authorization"] || req.query.accessToken;
  if (!accessToken) res.send("Access denied");
  _jsonwebtoken["default"].verify(accessToken, process.env.secret, function (err, result) {
    if (err) {
      res.send("Access denied, token expired or incorrect");
    } else {
      req.email = email;
      req.password = password;
      next();
    }
  });
}