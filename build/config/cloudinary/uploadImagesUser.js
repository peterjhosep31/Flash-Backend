"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
var cloudinaryFolders = {};
cloudinaryFolders.createFolder = function (name) {
  return _cloudinary.v2.api.create_folder("Flash/stores/" + name, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      _cloudinary.v2.api.create_folder(result.path + "/products", function (err, result) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
};
cloudinaryFolders.uploadImagesStore = function (image, folder) {
  return _cloudinary.v2.uploader.upload(image, {
    folder: folder,
    format: "jpg"
  }, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
};
cloudinaryFolders.uploadImagesUser = function (image) {
  return _cloudinary.v2.uploader.upload(image, {
    folder: "Flash",
    format: "jpg"
  }, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
};
var _default = cloudinaryFolders; // TODO: me sirve
// cloudinary.api.create_folder(result.path + "/offer", (err, result) => {
//   if (err) {
//     console.log(err);
//   }
// })
exports["default"] = _default;