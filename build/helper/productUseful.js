"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var useful = {};
useful.availability = function (data) {
  if (data == 1) {
    return 'available';
  } else if (data == 0) {
    return 'exhausted';
  }
};
useful.isEmpty = function (data) {
  if (data == null || data == undefined) {
    return true;
  } else {
    return false;
  }
};
var _default = useful;
exports["default"] = _default;