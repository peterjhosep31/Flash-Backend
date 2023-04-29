"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _dataBase = _interopRequireDefault(require("../../config/dataBase/dataBase.js"));
var _email = _interopRequireDefault(require("../../config/email/email.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var controllerSesionEmpleyoee = {};
controllerSesionEmpleyoee.Login = function (req, res) {
  var emailUser = req.body.email;
  var passwordUser = req.body.password;
  _dataBase["default"].query("SELECT password_employed FROM employee WHERE email_employee = ? ", [emailUser], function (err, rows) {
    if (!err) {
      if (rows.length > 0) {
        var passwordHash = rows[0].password_employee;
        _bcryptjs["default"].compare(passwordUser, passwordHash, function (err, result) {
          if (result) {
            return res.status("200").send({
              mensaje: "Usuario logueado con exito",
              result: result
            });
          } else {
            return res.status("202").send({
              mensaje: "Error al loguear el usuario, contraseña incorrecta",
              error: err
            });
          }
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al loguear el usuario, el usuario no existe",
          error: err
        });
      }
    } else {
      return res.status("202").send({
        mensaje: "Error al loguear el usuario",
        error: err
      });
    }
  });
};
controllerSesionEmpleyoee.UpdateDataStaff = function (req, res) {
  var idUser = req.body.document;
  var nameUser = req.body.name;
  var emailUser = req.body.email;
  var phoneUser = req.body.phone;
  var password = req.body.password;
  _dataBase["default"].query("SELECT password_employee FROM employee WHERE id_employee = ?", [idUser], function (err, rows) {
    if (!err) {
      if (rows.length > 0) {
        var passwordHash = rows[0].password_employee;
        _bcryptjs["default"].compare(password, passwordHash, function (err, result) {
          if (result) {
            _dataBase["default"].query("UPDATE employee SET name_employee = ?, email_employee = ?, phone_number_employee = ? WHERE id_employee = ?", [nameUser, emailUser, phoneUser, idUser], function (err, rows) {
              if (!err) {
                return res.status("200").send({
                  mensaje: "Usuario actualizado con exito"
                });
              } else {
                return res.status("202").send({
                  mensaje: "Error al actualizar el usuario",
                  error: err
                });
              }
            });
          } else {
            return res.status("202").send({
              mensaje: "La contraseña no coincide",
              error: err
            });
          }
        });
      } else {
        return res.status("202").send({
          mensaje: "No trae data",
          error: err
        });
      }
    } else {
      return res.status("202").send({
        mensaje: "El unusario nio se encuentra",
        error: err
      });
    }
  });
};
controllerSesionEmpleyoee.DeleteDataStaff = function (req, res) {
  var idUser = req.body.document;
  var password = req.body.password;
  _dataBase["default"].query("SELECT password_employed FROM employee WHERE id_employee = ? ", [idUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "La contraseña no incorrecta",
        error: err
      });
    } else if (rows.length > 0) {
      var passwordHash = rows[0].password_employee;
      _bcryptjs["default"].compare(password, passwordHash, function (err, result) {
        if (result) {
          _dataBase["default"].query("DELETE FROM employee WHERE id_employee = ?", [idUser], function (err, rows) {
            if (!err) {
              return res.status("200").send({
                mensaje: "Usuario eliminado con exito"
              });
            } else {
              return res.status("202").send({
                mensaje: "Error al eliminar el usuario",
                error: err
              });
            }
          });
        } else {
          return res.status("202").send({
            mensaje: "Error al eliminar el usuario, contraseña incorrecta",
            error: err
          });
        }
      });
    }
  });
};
controllerSesionEmpleyoee.ListDataStaff = function (req, res) {
  var email = req.body.emial;
  _dataBase["default"].query("SELECT * FROM employee WHERE email_employee = ?", [email], function (err, rows) {
    if (!err) {
      return res.status("200").send({
        mensaje: "Usuarios listados con exito",
        data: rows
      });
    } else {
      return res.status("202").send({
        mensaje: "Error al listar los usuarios",
        error: err
      });
    }
  });
};
controllerSesionEmpleyoee.RecoverPassword = function (req, res) {
  var emailUser = req.body.email;
  var codeRecoverPassword = Math.floor(Math.random() * 1000000);
  var passwordHash = _bcryptjs["default"].hash(codeRecoverPassword, 10);
  _dataBase["default"].query("UPDATE employee SET ? WHERE email_employee = ?", [{
    password_employee: passwordHash
  }, emailUser], function (err, rows) {
    if (!err) {
      _email["default"].sendMail({
        from: "2022.flash.sale@gmail.com",
        to: emailUser,
        subject: "Recuperacion de contraseña",
        html: "<h1>Recuperacion de contrase\xF1a</h1>\n          <p>Usted ha solicitado recuperar su contrase\xF1a, su nueva contrase\xF1a es: ".concat(codeRecoverPassword, "</p>\n          <p>Atentamente, el equipo de Flash.</p>")
      }.then(function (res) {
        return console.log("Correo enviado");
      })["catch"](function (err) {
        return console.log("Error al enviar el correo\n", err, "\n_____________________________");
      }));
      return res.status("200").send({
        mensaje: "Contraseña recuperada con exito"
      });
    } else {
      return res.status("202").send({
        mensaje: "Error al recuperar la contraseña",
        error: err
      });
    }
  });
};
controllerSesionEmpleyoee.UpdatePassword = function (req, res) {
  var emailUser = req.body.email;
  var passwordUser = req.body.password;
  var newPassword = req.body.newPassword;
  var newpasswordHash = _bcryptjs["default"].hash(newPassword, 10);
  _dataBase["default"].query("SELECT password_employee FROM employee WHERE email_employee = ?", [emailUser], function (err, rows) {
    if (!err) {
      if (rows.length > 0) {
        var passwordHash = rows[0].password_employee;
        _bcryptjs["default"].compare(passwordUser, passwordHash, function (err, result) {
          if (result) {
            _dataBase["default"].query("UPDATE employee SET ? WHERE email_employee = ?", [{
              password_employee: newpasswordHash
            }, emailUser], function (err, rows) {
              if (!err) {
                return res.status("200").send({
                  mensaje: "Contraseña actualizada con exito"
                });
              } else {
                return res.status("202").send({
                  mensaje: "Error al actualizar la contraseña",
                  error: err
                });
              }
            });
          } else {
            return res.status("202").send({
              mensaje: "Error al actualizar la contraseña, contraseña incorrecta",
              error: err
            });
          }
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al actualizar la contraseña, el usuario no existe",
          error: err
        });
      }
    } else {
      return res.status("202").send({
        mensaje: "Error al actualizar la contraseña",
        error: err
      });
    }
  });
};

// TODO:  RUTA que utiliza es el admin para actualizar el estado de un empleado
controllerSesionEmpleyoee.UpdateState = function (req, res) {
  var idUser = req.body.document;
  var stateEmployee = req.body.state;
  var idAdmin = req.body.idAdmin;
  var passwordAdmin = req.body.password;
  _dataBase["default"].query("SELECT password_admin FROM administrator WHERE id_admin = ?", [idAdmin], function (err, rows) {
    if (!err) {
      if (rows.length > 0) {
        var passwordHash = rows[0].password_employee;
        _bcryptjs["default"].compare(passwordAdmin, passwordHash, function (err, result) {
          if (result) {
            _dataBase["default"].query("UPDATE employee SET ? WHERE id_employee = ?", [{
              state_employee: stateEmployee
            }, idUser], function (err, rows) {
              if (!err) {
                return res.status("200").send({
                  mensaje: "Estado actualizado con exito"
                });
              } else {
                return res.status("202").send({
                  mensaje: "Error al actualizar el estado",
                  error: err
                });
              }
            });
          } else {
            return res.status("202").send({
              mensaje: "Error al actualizar el estado, contraseña incorrecta",
              error: err
            });
          }
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al actualizar el estado, el usuario no existe",
          error: err
        });
      }
    } else {
      return res.status("202").send({
        mensaje: "Error al actualizar el estado",
        error: err
      });
    }
  });
};
controllerSesionEmpleyoee.UpdateEmail = function (req, res) {
  var idUser = req.body.document;
  var emailUser = req.body.email;
  var parameter = true;
  _dataBase["default"].query("SELECT id_customer FROM customer WHERE id_customer = ?", [idUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "usuario no encontrado",
        error: err
      });
    } else {
      if (rows.length > 0) {
        var idUserDB = rows[0];
        if (idUser != idUserDB) {
          parameter = false;
        }
        if (parameter == true) {
          _dataBase["default"].query("UPDATE customer SET ? WHERE id_customer = ?", [{
            email_customer: emailUser
          }, idUser], function (err, rows) {
            if (!err) {
              return res.status("200").send({
                mensaje: "Email actualizado con exito"
              });
            } else {
              return res.status("202").send({
                mensaje: "Error al actualizar el email",
                error: err
              });
            }
          });
        }
      } else {
        return res.status("202").send({
          mensaje: "Error al actualizar el email",
          error: err
        });
      }
    }
  });
};
var _default = controllerSesionEmpleyoee;
exports["default"] = _default;