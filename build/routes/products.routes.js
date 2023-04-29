"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _productControllers = _interopRequireDefault(require("../controllers/product.controllers.js"));
var _jsonWebToken = _interopRequireDefault(require("../config/accessToken/jsonWebToken.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = (0, _express.Router)();
routes.get("/productsConsultation", _productControllers["default"].getProduct);
routes.post("/addProducts", _jsonWebToken["default"].validateToken, _productControllers["default"].postProduct);
// routes.put("/updateProducts", veryfyAccess.validateToken, products.putProduct);
// routes.delete("/deleteProducts", veryfyAccess.validateToken, products.deleteProduct);
var _default = routes;
exports["default"] = _default;