"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = connectCloudinary;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _cloudinary = _interopRequireDefault(require("cloudinary"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
function connectCloudinary() {
  _cloudinary["default"].config({
    cloud_name: 'djaejhxwz',
    api_key: '849518477251571',
    api_secret: 'mEYQ6SPWRwH4GPG9MBX1ObELlwc',
    secure: true
  });
}