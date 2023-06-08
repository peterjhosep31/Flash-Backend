"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _jsonWebToken = _interopRequireDefault(require("../config/accessToken/jsonWebToken.js"));
var _buyControllers = _interopRequireDefault(require("../controllers/buy.controllers.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routes = (0, _express.Router)();
routes.post("/buy/:idProduct/:price", _jsonWebToken["default"].validateToken, _buyControllers["default"].addBuy);
routes.get("/buyStore", _jsonWebToken["default"].validateToken, _buyControllers["default"].getBuysStore);
routes.get("/buyCustomer", _jsonWebToken["default"].validateToken, _buyControllers["default"].getBuys);
routes.get("/buyStoreGrafic", _jsonWebToken["default"].validateToken, _buyControllers["default"].getStoreGrafic);
var _default = routes;
exports["default"] = _default;