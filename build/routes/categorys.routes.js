"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _categoryControllers = _interopRequireDefault(require("../controllers/category.controllers.js"));
var _jsonWebToken = _interopRequireDefault(require("../config/accessToken/jsonWebToken.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = (0, _express.Router)();
routes.get('/categorysCponsultation', _categoryControllers["default"].getCategory);
routes.post('/addCategory', _jsonWebToken["default"].validateToken, _categoryControllers["default"].postCategory);
routes.put('/updateCategory', _jsonWebToken["default"].validateToken, _categoryControllers["default"].putCategory);
routes["delete"]('/deleteCategory', _jsonWebToken["default"].validateToken, _categoryControllers["default"].deleteCategory);
var _default = routes;
exports["default"] = _default;