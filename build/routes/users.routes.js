"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _express = require("express");
var _jsonWebToken = _interopRequireDefault(require("../config/accessToken/jsonWebToken.js"));
var _sessioneCustomer = _interopRequireDefault(require("../controllers/sections/sessioneCustomer.js"));
var _sectionAdmin = _interopRequireDefault(require("../controllers/sections/section.Admin.js"));
var _seccionsEmpleyee = _interopRequireDefault(require("../controllers/sections/seccionsEmpleyee.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = (0, _express.Router)();
routes.put("/updateCustomer", _jsonWebToken["default"].validateToken, (0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: "./uploads"
}), _sessioneCustomer["default"].updateData);
routes.put("/updateData", (0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: "./uploads"
}), _jsonWebToken["default"].validateToken, _sectionAdmin["default"].updateProfile);
routes.get("/gatDataCustomer", _jsonWebToken["default"].validateToken, _sessioneCustomer["default"].getData);
routes.get("/gatDataAccount", _jsonWebToken["default"].validateToken, _sectionAdmin["default"].getData);
routes.get("/getSmall/:limit", _sectionAdmin["default"].getSmalls);
routes.get("/getEmployee", _jsonWebToken["default"].validateToken, _seccionsEmpleyee["default"].getData);
var _default = routes;
exports["default"] = _default;