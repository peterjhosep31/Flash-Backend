"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var password = {};
password.cretaePassword = function () {
  // crear una funcion ramdom de 6 carateres
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var password = '';
  for (var i = 0; i < 6; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
};
password.codePassword = function () {
  // crear una funcion ramdom de 4 carateres
  var characters = '0123456789';
  var password = '';
  for (var i = 0; i < 4; i++) {
    password += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return password;
};
var _default = password;
exports["default"] = _default;