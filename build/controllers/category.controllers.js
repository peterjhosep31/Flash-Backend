"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dataBase = _interopRequireDefault(require("../config/dataBase/dataBase.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var controllerCategory = {};
controllerCategory.postCategory = function (req, res) {
  var idCategory = req.body.idCategory;
  var nameCategory = req.body.nameCategory;
  var descriptionCategory = req.body.descriptionCategory;
  _dataBase["default"].query("INSERT INTO category SET ?", {
    id_category: idCategory,
    name_category: nameCategory,
    description_category: descriptionCategory,
    id_categ_stor: 1
  }, function (err, rows) {
    if (err) {
      return res.state("201").send({
        mensaje: "Error al insertar categoria",
        error: err
      });
    } else {
      return res.state("200").send({
        mensaje: "Categoria insertada con exito",
        rows: rows
      });
    }
  });
};

//ROTER GET OF CATEGORY
controllerCategory.getCategory = function (req, res) {
  _dataBase["default"].query("SELECT * FROM category", function (err, rows) {
    if (!err) {
      return res.state("200").send({
        mensaje: " Error al mostrar categoria",
        error: err
      });
    } else {
      return res.state("200").send({
        mensaje: "Mostrando categoria con exito",
        rows: rows
      });
    }
  });
};

//ROTER PUT OF CATEGORY
controllerCategory.putCategory = function (req, res) {
  var nameCategory = req.body.nameCategory;
  var descriptionCategory = req.body.descriptionCategory;
  var idCategory = req.body.idCategory;
  var idEmployee = req.body.idEmpleyee;
  var passwordEmployee = req.body.passwordEmployee;
  connectionDB.query("SELECT password_employed FROM employee WHERE id_employee = ?", [idEmployee], function (err, rows) {
    if (err) {
      return res.status(202).send({
        mensaje: "Empleado no encontrado",
        error: err
      });
    }
    var passwordDB = rows[0].password_employed;
    bcryptjs.compare(passwordDB, passwordEmployee, function (err, result) {
      if (result) {
        connectionDB.query("UPDATE category SET ? WHERE id_category= ?", [{
          name_category: nameCategory,
          description_category: descriptionCategory,
          id_category: idCategory
        }, idCategory], function (err, rows) {
          if (err) {
            return res.state("201").send({
              mensaje: "Error al editar categoria",
              error: err
            });
          } else {
            return res.state("200").send({
              mensaje: "Categoria editada con exito",
              rows: rows
            });
          }
        });
      }
    });
  });
};

//ROTER DELETE OF CATEGORY
//ROTER DELETE OF PRODUCTS
controllerCategory.deleteCategory = function (req, res) {
  var idCategory = req.body.idCategory;
  var idEmployee = req.body.idEmpleyee;
  var passwordEmployee = req.body.passwordEmployee;
  connectionDB.query("SELECT password_employed FROM employee WHERE id_employee = ?", [idEmployee], function (err, rows) {
    if (err) {
      return res.status(202).send({
        mensaje: "Empleado no encontrado",
        error: err
      });
    }
    var passwordDB = rows[0].password_employed;
    bcryptjs.compare(passwordDB, passwordEmployee, function (err, result) {
      if (result) {
        connectionDB.query("DELETE category WHERE id_category= ?", [idCategory], function (err, rows) {
          if (err) {
            return res.state("201").send({
              mensaje: "Error al eliminar categoria",
              error: err
            });
          } else {
            return res.state("200").send({
              mensaje: "Categoria eliminada con exito",
              rows: rows
            });
          }
        });
      }
    });
  });
};
var _default = controllerCategory;
exports["default"] = _default;