"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _expressFileupload = _interopRequireDefault(require("express-fileupload"));
var _jsonWebToken = _interopRequireDefault(require("../config/accessToken/jsonWebToken.js"));
var _storeControllers = _interopRequireDefault(require("../controllers/store.controllers.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express.Router)();
router.put("/updateStore", _jsonWebToken["default"].validateToken, (0, _expressFileupload["default"])({
  useTempFiles: true,
  tempFileDir: "./uploads"
}), _storeControllers["default"].putStore);
router["delete"]("/deleteStore/:code", _jsonWebToken["default"].validateToken, _storeControllers["default"].deleteStore);
router.get("/getStoreAdmin", _jsonWebToken["default"].validateToken, _storeControllers["default"].getStoreAdmin);
router.get("/getDataStore", _jsonWebToken["default"].validateToken, _storeControllers["default"].getDataStore);
router.post("/addStore", _jsonWebToken["default"].validateToken, _storeControllers["default"].postStore);
router.get("/consultationStore/:code/:idStore", _storeControllers["default"].getStore);
router.get("/consultationStore/:limit", _storeControllers["default"].getStores);
var _default = router;
exports["default"] = _default;