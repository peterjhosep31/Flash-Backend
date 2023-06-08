"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _jsonWebToken = _interopRequireDefault(require("../config/accessToken/jsonWebToken.js"));
var _categoryControllers = _interopRequireDefault(require("../controllers/category.controllers.js"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = (0, _express.Router)();
routes.post('/addCategory', _jsonWebToken["default"].validateToken, (0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: './uploads'
}), _categoryControllers["default"].postCategory);
routes["delete"]('/deleteCategory/:code', _jsonWebToken["default"].validateToken, _categoryControllers["default"].deleteCategory);
routes.get('/getCategoriesStore', _jsonWebToken["default"].validateToken, _categoryControllers["default"].getCategoriesStore);
routes.get('/getCategoryStore', _jsonWebToken["default"].validateToken, _categoryControllers["default"].getCategoryStore);
routes.put('/updateCategory/:code', _jsonWebToken["default"].validateToken, _categoryControllers["default"].putCategory);
routes.get('/getProductOne/:code', _jsonWebToken["default"].validateToken, _categoryControllers["default"].getCategoryOne);
routes.get('/getCategories', _categoryControllers["default"].getCategory);
var _default = routes;
exports["default"] = _default;