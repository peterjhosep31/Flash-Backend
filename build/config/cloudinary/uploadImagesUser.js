"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = uploadImagesUser;
var _cloudinary = require("cloudinary");
var _dotenv = _interopRequireDefault(require("dotenv"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dotenv["default"].config();
_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APY_KEY,
  api_secret: process.env.CLOUDINARY_APY_KEY_SECRET,
  secure: true
});
function uploadImagesUser(image) {
  return _cloudinary.v2.uploader.upload(image, {
    folder: "Flash/User",
    format: "jpg"
  }, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
}
;