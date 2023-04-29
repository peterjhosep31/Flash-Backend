"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _yup = require("yup");
var _dataBase = _interopRequireDefault(require("../config/dataBase/dataBase.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var controllerStore = {};

//ROTER POST OF STORE
controllerStore.postStore = function () {
  var idStore = req.body.idStore;
  var nameStore = req.body.descriptionStore;
  var locationStore = req.body.locationStore;
  var descriptionStore = req.body.descriptionStore;
  var idAdministrator = req.body.idAdministrator;
  var passwordAdministrator = req.body.passwordAdministrator;
  var store = (0, _yup.object)({
    idStore: (0, _yup.number)().required().integer().positive(),
    nameStore: (0, _yup.string)().required(),
    locationStore: (0, _yup.string)().required(),
    descriptionStore: (0, _yup.string)().required(),
    idAdministrator: (0, _yup.number)().required().positive(),
    passwordAdministrator: require()
  });
  connectionDB.query("SELECT password_admin FROM administrator WHERE id_admin = ?", [idAdministrator], function (err, rows) {
    if (err) {
      return res.status(202).send({
        mensaje: "Administrador no encontrado",
        error: err
      });
    }
    var passwordDB = rows[0].password_admin;
    bcryptjs.compare(passwordDB, passwordAdministrator, function (err, result) {
      if (result) {
        connectionDB.query("INSERT INTO store SET ?", {
          id_store: idStore,
          name_store: nameStore,
          location_store: locationStore,
          description_store: descriptionStore,
          id_emp_str: 1
        }, function (err, rows) {
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

//ROTER GET OF STORE
controllerStore.getStore = function () {
  _dataBase["default"].query("SELECT * FROM store", function (err, rows) {
    if (!err) {
      return res.state("200").send({
        mensaje: " Error al mostrar local",
        error: err
      });
    } else {
      return res.state("200").send({
        mensaje: "Mostrando local con exito",
        rows: rows
      });
    }
  });
};

//ROTER PUT OF STORE
controllerStore.putStore = function () {
  var idStore = req.body.idStore;
  var nameStore = req.body.descriptionStore;
  var locationStore = req.body.locationStore;
  var descriptionStore = req.body.descriptionStore;
  var idEmployee = req.body.idEmpleyee;
  var passwordEmployee = req.body.passwordEmployee;
  var store = (0, _yup.object)({
    idStore: (0, _yup.number)().required().integer().positive(),
    nameStore: (0, _yup.string)().required(),
    locationStore: (0, _yup.string)().required(),
    descriptionStore: (0, _yup.string)().required(),
    idEmployee: (0, _yup.number)().required().positive(),
    passwordEmployee: require()
  });
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
        connectionDB.query("UPDATE store SET ? WHERE id_store= ?", [{
          id_store: idStore,
          name_store: nameStore,
          location_store: locationStore,
          description_store: descriptionStore,
          id_emp_str: 1
        }, idStore], function (err, rows) {
          if (err) {
            return res.state("201").send({
              mensaje: "Error al editar local",
              error: err
            });
          } else {
            return res.state("200").send({
              mensaje: "Local editado con exito",
              rows: rows
            });
          }
        });
      }
    });
  });
};

//ROTER DELETE OF STORE
controllerStore.deleteStore = function () {
  var idStore = req.body.idStore;
  var idAdministrator = req.body.idAdministrator;
  var passwordAdministrator = req.body.passwordAdministrator;
  var store = (0, _yup.object)({
    idStore: (0, _yup.number)().required().integer().positive(),
    idAdministrator: (0, _yup.number)().required().positive(),
    passwordAdministrator: require()
  });
  connectionDB.query("SELECT password_admin FROM administrator WHERE id_admin = ?", [idAdministrator], function (err, rows) {
    if (err) {
      return res.status(202).send({
        mensaje: "Administrador no encontrado",
        error: err
      });
    }
    var passwordDB = rows[0].password_admin;
    bcryptjs.compare(passwordDB, passwordAdministrator, function (err, result) {
      if (result) {
        connectionDB.query("DELETE store WHERE id_store= ?", [idStore], function (err, rows) {
          if (err) {
            return res.state("201").send({
              mensaje: "Error al eliminar local",
              error: err
            });
          } else {
            return res.state("200").send({
              mensaje: "Local eliminado con exito",
              rows: rows
            });
          }
        });
      }
    });
  });
};
var _default = controllerStore;
exports["default"] = _default;