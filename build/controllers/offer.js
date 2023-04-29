"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _dataBase = _interopRequireDefault(require("../config/dataBase/dataBase.js"));
var _yup = require("yup");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var controllerOffer = {};

//ROTER POST OF OFFER
controllerOffer.postOffer = function () {
  var idOffer = req.body.idProduct;
  var nameOffer = req.body.nameProduct;
  var descriptionOffer = req.body.descriptionProduct;
  var availabilityOffer = req.body.availabilityProduct;
  var amountOffer = req.body.amountProduct;
  var offer = (0, _yup.object)({
    idOffer: (0, _yup.number)().positive().required(),
    nameOffer: (0, _yup.string)().required(),
    descriptionOffer: (0, _yup.string)().required(),
    availabilityOffer: (0, _yup.string)().required(),
    amountOffer: (0, _yup.number)().required().integer().positive()
  });
  _dataBase["default"].query("INSERT INTO offer SET ?", {
    id_offer: idOffer,
    name_offer: nameOffer,
    description_offer: descriptionOffer,
    amount_offer: availabilityOffer,
    availability_product: amountOffer,
    id_product_offer: 1
  }, function (err, rows) {
    if (err) {
      return res.state("201").send({
        mensaje: "Error al insertar oferta",
        error: err
      });
    } else {
      return res.state("200").send({
        mensaje: "Oferta insertado con exito",
        rows: rows
      });
    }
  });
};

//ROTER GET OF OFFER
controllerOffer.getOffer = function () {
  _dataBase["default"].query("SELECT * FROM offer"), function (err, rows) {
    if (!err) {
      return res.state("200").send({
        mensaje: " Error al mostrar oferta",
        error: err
      });
    } else {
      return res.state("200").send({
        mensaje: "Mostrando OFERTA con exito",
        rows: rows
      });
    }
  };
};

//ROTER PUT OF OFFER
controllerOffer.putOffer = function () {
  var idOffer = req.body.idProduct;
  var nameOffer = req.body.nameProduct;
  var descriptionOffer = req.body.descriptionProduct;
  var availabilityOffer = req.body.availabilityProduct;
  var amountOffer = req.body.amountProduct;
  var idEmployee = req.body.idEmpleyee;
  var passwordEmployee = req.body.passwordEmployee;
  var offer = (0, _yup.object)({
    idOffer: (0, _yup.number)().positive().required(),
    nameOffer: (0, _yup.string)().required(),
    descriptionOffer: (0, _yup.string)().required(),
    availabilityOffer: (0, _yup.string)().required(),
    amountOffer: (0, _yup.number)().required().integer().positive(),
    idEmployee: (0, _yup.number)().required().positive(),
    passwordEmployee: require()
  });
  _dataBase["default"].query("SELECT password_employed FROM employee WHERE id_employee = ?", [idEmployee], function (err, rows) {
    if (err) {
      return res.status(202).send({
        mensaje: "Empleado no encontrado",
        error: err
      });
    }
    var passwordDB = rows[0].password_employed;
    _bcryptjs["default"].compare(passwordDB, passwordEmployee, function (err, result) {
      if (result) {
        _dataBase["default"].query("UPDATE offer SET ? WHERE id_offer= ?", [{
          name_offer: nameOffer,
          description_offer: descriptionOffer,
          amount_offer: availabilityOffer,
          availability_product: amountOffer
        }, idOffer], function (err, rows) {
          if (err) {
            return res.state("201").send({
              mensaje: "Error al editar oferta",
              error: err
            });
          } else {
            return res.state("200").send({
              mensaje: "Oferta editado con exito",
              rows: rows
            });
          }
        });
      }
    });
  });
};

//ROTER DELETE OF OFFER
controllerOffer.deleteOffer = function () {
  var idOffer = req.body.idProduct;
  var idEmployee = req.body.idEmpleyee;
  var passwordEmployee = req.body.passwordEmployee;
  var product = (0, _yup.object)({
    idOffer: (0, _yup.number)().required().positive(),
    idEmployee: (0, _yup.number)().required().positive(),
    passwordEmployee: require()
  });
  _dataBase["default"].query("SELECT password_employed FROM employee WHERE id_employee = ?", [idEmployee], function (err, rows) {
    if (err) {
      return res.status(202).send({
        mensaje: "Empleado no encontrado",
        error: err
      });
    }
    var passwordDB = rows[0].password_employed;
    _bcryptjs["default"].compare(passwordDB, passwordEmployee, function (err, result) {
      if (result) {
        _dataBase["default"].query("DELETE offer WHERE id_offer= ?", [idOffer], function (err, rows) {
          if (err) {
            return res.state("201").send({
              mensaje: "Error al eliminar oferta",
              error: err
            });
          } else {
            return res.state("200").send({
              mensaje: "Oferta eliminado con exito",
              rows: rows
            });
          }
        });
      }
    });
  });
};
var _default = controllerOffer;
exports["default"] = _default;