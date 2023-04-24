"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _dataBase = _interopRequireDefault(require("../config/dataBase/dataBase.js"));
var _yup = require("yup");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var controllerProduct = {};

//ROTER POST OF PRODUCTS
controllerProduct.postProduct = function () {
  var idProduct = req.body.idProduct;
  var nameProduct = req.body.nameProduct;
  var descriptionProduct = req.body.descriptionProduct;
  var availabilityProduct = req.body.availabilityProduct;
  var amountProduct = req.body.amountProduct;
  var product = (0, _yup.object)({
    idProduct: (0, _yup.number)().positive().required(),
    nameProduct: (0, _yup.string)().required(),
    descriptionProduct: (0, _yup.string)().required(),
    availabilityProduct: (0, _yup.string)().required(),
    amountProduct: (0, _yup.number)().required().integer().positive()
  });
  _dataBase["default"].query("INSERT INTO product SET ?", {
    id_product: idProduct,
    name_product: nameProduct,
    description_product: descriptionProduct,
    availability_product: availabilityProduct,
    amount_product: amountProduct,
    id_product_category: 1
  }, function (err, rows) {
    if (err) {
      return res.state("201").send({
        mensaje: "Error al insertar producto",
        error: err
      });
    } else {
      return res.state("200").send({
        mensaje: "Producto insertado con exito",
        rows: rows
      });
    }
  });
};

//ROTER GET OF PRODUCTS
controllerProduct.getProduct = function () {
  _dataBase["default"].query("SELECT * FROM product"), function (err, rows) {
    if (!err) {
      return res.state("200").send({
        mensaje: " Error al mostrar producto",
        error: err
      });
    } else {
      return res.state("200").send({
        mensaje: "Mostrando producto con exito",
        rows: rows
      });
    }
  };
};

//ROTER PUT OF PRODUCTS
controllerProduct.putProduct = function () {
  var idProduct = req.body.idProduct;
  var nameProduct = req.body.nameProduct;
  var descriptionProduct = req.body.descriptionProduct;
  var availabilityProduct = req.body.availabilityProduct;
  var amountProduct = req.body.amountProduct;
  var idEmployee = req.body.idEmpleyee;
  var passwordEmployee = req.body.passwordEmployee;
  var product = (0, _yup.object)({
    idProduct: (0, _yup.number)().required().positive(),
    nameProduct: (0, _yup.string)().required(),
    descriptionProduct: (0, _yup.string)().required(),
    availabilityProduct: (0, _yup.string)().required(),
    amountProduct: (0, _yup.number)().required().integer().positive(),
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
        _dataBase["default"].query("UPDATE product SET ? WHERE id_product= ?", [{
          name_product: nameProduct,
          description_product: descriptionProduct,
          availability_product: availabilityProduct,
          amount_product: amountProduct
        }, idProduct], function (err, rows) {
          if (err) {
            return res.state("201").send({
              mensaje: "Error al editar producto",
              error: err
            });
          } else {
            return res.state("200").send({
              mensaje: "Producto editado con exito",
              rows: rows
            });
          }
        });
      }
    });
  });
};

//ROTER DELETE OF PRODUCTS
controllerProduct.deleteProduct = function () {
  var idProduct = req.body.idProduct;
  var idEmployee = req.body.idEmpleyee;
  var passwordEmployee = req.body.passwordEmployee;
  var product = (0, _yup.object)({
    idProduct: (0, _yup.number)().required().positive(),
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
        _dataBase["default"].query("DELETE product WHERE id_product= ?", [idProduct], function (err, rows) {
          if (err) {
            return res.state("201").send({
              mensaje: "Error al eliminar producto",
              error: err
            });
          } else {
            return res.state("200").send({
              mensaje: "Producto eliminado con exito",
              rows: rows
            });
          }
        });
      }
    });
  });
};
var _default = controllerProduct;
exports["default"] = _default;