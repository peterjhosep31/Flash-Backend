"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dataBase = _interopRequireDefault(require("../../config/dataBase/dataBase.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var controllerSesionEmpleyee = {};
controllerSesionEmpleyee.updateData = function (req, res) {
  console.log(req.body);
  console.log(req.files);
  var emialUser = req.user.emialUser;
  var data = req.body.data;
};
controllerSesionEmpleyee.getData = function (req, res) {
  var idStore = req.user.idUser;
  _dataBase["default"].query("SELECT * FROM employee WHERE id_store = ?", [idStore], function (err, rows) {
    if (!err && rows.length > 0) {
      return res.status(200).send({
        mensaje: "Mostrando datos del empleado",
        data: rows
      });
    } else {
      return res.status(404).send({
        mensaje: "Error al mostrar los datos del empleado"
      });
    }
  });
};
var _default = controllerSesionEmpleyee;
exports["default"] = _default;