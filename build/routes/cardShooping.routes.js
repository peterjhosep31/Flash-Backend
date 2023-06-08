"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _jsonWebToken = _interopRequireDefault(require("../config/accessToken/jsonWebToken.js"));
var _cardShoppingControllers = _interopRequireDefault(require("../controllers/cardShopping.controllers.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var rutes = (0, _express.Router)();
rutes["delete"]("/deleteCard/:idProduct", _jsonWebToken["default"].validateToken, _cardShoppingControllers["default"].deleteShopping);
rutes.put("/updateCard/:idProduct", _jsonWebToken["default"].validateToken, _cardShoppingControllers["default"].updateShopping);
rutes.post("/addCard", _jsonWebToken["default"].validateToken, _cardShoppingControllers["default"].postShopping);
rutes.get("/getCard", _jsonWebToken["default"].validateToken, _cardShoppingControllers["default"].getShopping);
var _default = rutes;
exports["default"] = _default;