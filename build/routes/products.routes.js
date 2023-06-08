"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _jsonWebToken = _interopRequireDefault(require("../config/accessToken/jsonWebToken.js"));
var _productControllers = _interopRequireDefault(require("../controllers/product.controllers.js"));
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = (0, _express.Router)();
routes.post("/addProducts", _jsonWebToken["default"].validateToken, (0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: "./uploads"
}), _productControllers["default"].postProduct);
routes["delete"]("/deleteProducts/:code", _jsonWebToken["default"].validateToken, _productControllers["default"].deleteProduct);
routes.get("/getProductsStore", _jsonWebToken["default"].validateToken, _productControllers["default"].getProductStore);
routes.put("/updateProducts/:code", _jsonWebToken["default"].validateToken, _productControllers["default"].putProduct);
routes.get("/getProductStoreCustomer/:code", _productControllers["default"].getProductCustomer);
routes.get("/productsConsultation/:limit/:code", _productControllers["default"].getProduct);
routes.get("/getProductMall/:code/:idStore", _productControllers["default"].getProductMall);
routes.get("/getProductDiscount", _productControllers["default"].getProductDescount);
routes.get("/getProductOne/:code", _productControllers["default"].getProductOne);
routes.get("/getProductCategory", _productControllers["default"].getProductCategory);
routes.get("/getProductDate", _productControllers["default"].getProductDate);
var _default = routes;
exports["default"] = _default;