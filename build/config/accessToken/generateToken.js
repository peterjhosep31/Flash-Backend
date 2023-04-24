"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateAccessToken;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
function generateAccessToken(email, password) {
  return _jsonwebtoken["default"].sign({
    email: email,
    password: password
  }, process.env.SECRECT_KEY_JWT, {
    expiresIn: "1h"
  });
}