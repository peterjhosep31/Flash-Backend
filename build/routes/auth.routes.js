"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _jsonWebToken = _interopRequireDefault(require("../config/accessToken/jsonWebToken.js"));
var _authSignUpControllers = _interopRequireDefault(require("../controllers/auth/auth.signUp.controllers.js"));
var _authSingInControllers = _interopRequireDefault(require("../controllers/auth/auth.singIn.controllers.js"));
var _authRecoverPassword = _interopRequireDefault(require("../controllers/auth/auth.recoverPassword.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = (0, _express.Router)();
routes.post("/signUpAdmin", (0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: './uploads'
}), _authSignUpControllers["default"].signUpAdmin);
routes.post("/validateToken", _jsonWebToken["default"].validateToken, _authSignUpControllers["default"].signUpAdminToken);
routes.put("/recoverPassword", _authRecoverPassword["default"].recoverPasswordUserCode);
routes.post("/signUpCustomer", _authSignUpControllers["default"].signUpCustomer);
routes.put("/updatePassword", _authRecoverPassword["default"].updatePassword);
routes.put("/newPassword", _authRecoverPassword["default"].recoverPassword);
routes.post("/signInUser", _authSingInControllers["default"].singIn);
var _default = routes;
exports["default"] = _default;