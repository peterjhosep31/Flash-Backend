"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var configEmail = _nodemailer["default"].createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "2022.flash.sale@gmail.com",
    pass: 'hgrhllbhrxposmso'
  }
});
var _default = configEmail;
exports["default"] = _default;