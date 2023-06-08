"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _productsRoutes = _interopRequireDefault(require("./products.routes.js"));
var _authRoutes = _interopRequireDefault(require("./auth.routes.js"));
var _categorysRoutes = _interopRequireDefault(require("./categorys.routes.js"));
var _storeRoutes = _interopRequireDefault(require("./store.routes.js"));
var _cardShoopingRoutes = _interopRequireDefault(require("./cardShooping.routes.js"));
var _usersRoutes = _interopRequireDefault(require("./users.routes.js"));
var _buysRoutes = _interopRequireDefault(require("./buys.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routesExpress = _express["default"].Router();
routesExpress.use('/products', _productsRoutes["default"]);
routesExpress.use('/authUser', _authRoutes["default"]);
routesExpress.use('/stores', _storeRoutes["default"]);
routesExpress.use('/category', _categorysRoutes["default"]);
routesExpress.use('/card', _cardShoopingRoutes["default"]);
routesExpress.use("/user", _usersRoutes["default"]);
routesExpress.use("/buy", _buysRoutes["default"]);
var _default = routesExpress;
exports["default"] = _default;