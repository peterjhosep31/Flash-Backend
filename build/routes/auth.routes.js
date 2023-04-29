"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _authSignUpControllers = _interopRequireDefault(require("../controllers/auth/auth.signUp.controllers.js"));
var _authSingInControllers = _interopRequireDefault(require("../controllers/auth/auth.singIn.controllers.js"));
var _jsonWebToken = _interopRequireDefault(require("../config/accessToken/jsonWebToken.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = (0, _express.Router)();
routes.post("/signUpAdmin", _authSignUpControllers["default"].signUpAdmin);
routes.post("/signUpCustomer", _authSignUpControllers["default"].signUpCustomer);
routes.post("/signUpEmployee", _jsonWebToken["default"].validateToken, _authSignUpControllers["default"].signUpEmployee);
routes.post("/signInUser", _authSingInControllers["default"].singIn);
var _default = routes;
exports["default"] = _default;