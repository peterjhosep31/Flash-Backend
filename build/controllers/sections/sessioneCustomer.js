"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _dataBase = _interopRequireDefault(require("../../config/dataBase/dataBase.js"));
var _email = _interopRequireDefault(require("../../config/email/email.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var controllerSesionCustomer = {};
controllerSesionCustomer.Registre = function (req, res) {
  var idUser = req.body.document;
  var nameUser = req.body.name;
  var phoneUser = req.body.phone;
  var emailUser = req.body.email;
  var addresssUser = req.body.address;
  var passwordUser = req.body.password;
  var passwordHash = _bcryptjs["default"].hash(passwordUser, 10);
  _dataBase["default"].query("INSERT INTO customer SET ?", {
    id_customer: idUser,
    name_customer: nameUser,
    //! Cambiar admin por customer
    phone_number_admin: phoneUser,
    email_customer: emailUser,
    address_customer: addresssUser,
    pasword_customer: passwordHash
  }, function (err, rows) {
    if (!err) {
      _email["default"].sendMail({
        from: "2022.flash.sale@gmail.com",
        to: emailUser,
        subject: "Bienvenido a Flash",
        html: "<h1>\xA1Bienvenido a Flash!</h1>\n          <p>Gracias por registrarte en nuestra plataforma, ahora podr\xE1s disfrutar de las mejores ofertas y promociones de tus tiendas favoritas.</p>\n          <p>\xA1No te olvides de visitarnos!</p>\n          <p>Atentamente, el equipo de Flash.</p>"
      }).then(function (res) {
        return console.log("Email enviado correctamente");
      })["catch"](function (err) {
        return console.log("_________ERROR AL ENVIAR EL MAIL _________\n", err, "\n__________________________________");
      });
      return res.status("200").send({
        mensaje: "Usuario insertado con exito",
        result: result
      });
    } else if (err.code == "ER_DUP_ENTRY") {
      return res.status("202").send({
        mensaje: "Error al insertar usuario, el usuario ya existe",
        error: err
      });
    } else {
      return res.status("202").send({
        mensaje: "Error al insertar usuario",
        error: err
      });
    }
  });
};
controllerSesionCustomer.Login = function (req, res) {
  var emailUser = req.body.email;
  var passwordUser = req.body.password;
  _dataBase["default"].query("SELECT pasword_customer FROM customer WHERE email_customer = ?", [emailUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al consultar la base de datos",
        error: err
      });
    } else {
      if (rows.length > 0) {
        _bcryptjs["default"].compare(passwordUser, rows[0].pasword_customer, function (err, result) {
          if (result) {
            return res.status("200").send({
              mensaje: "Usuario logueado con exito",
              result: result
            });
          } else {
            return res.status("202").send({
              mensaje: "Error al loguear usuario, contraseña incorrecta",
              error: err
            });
          }
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al loguear usuario, el usuario no existe",
          error: err
        });
      }
    }
  });
};
controllerSesionCustomer.UpdateDataStaff = function (req, res) {
  var idUser = req.body.document;
  var nameUser = req.body.name;
  var phoneUser = req.body.phone;
  var emailUser = req.body.email;
  var addresssUser = req.body.address;
  var passwordUser = req.body.password;
  _dataBase["default"].query("SELECT pasword_customer FROM customer WHERE id_customer = ?", [idUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al consultar la base de datos",
        error: err
      });
    } else {
      var passwordUserDB = rows[0].pasword_customer;
      if (passwordUserDB == passwordUser) {
        _dataBase["default"].query("UPDATE customer SET name_customer = ?, phone_number_admin = ?, email_customer = ?, address_customer = ? WHERE id_customer = ?", [nameUser, phoneUser, emailUser, addresssUser, idUser], function (err, rows) {
          if (err) {
            return res.status("202").send({
              mensaje: "Error al actualizar el usuario",
              error: err
            });
          } else {
            return res.status("200").send({
              mensaje: "Usuario actualizado con exito"
            });
          }
        });
      }
    }
  });
};
controllerSesionCustomer.DeleteDataStaff = function (req, res) {
  var idUser = req.body.document;
  var passwordUser = req.body.password;
  _dataBase["default"].query("SELECT pasword_customer FROM customer WHERE id_customer = ?", [idUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al consultar la base de datos",
        error: err
      });
    } else {
      var passwordUserDB = rows[0].pasword_customer;
      if (passwordUserDB == passwordUser) {
        _dataBase["default"].query("DELETE FROM customer WHERE id_customer = ?", [idUser], function (err, rows) {
          if (err) {
            return res.status("202").send({
              mensaje: "Error al eliminar el usuario",
              error: err
            });
          } else {
            return res.status("200").send({
              mensaje: "Usuario eliminado con exito"
            });
          }
        });
      }
    }
  });
};
controllerSesionCustomer.ListDataStaff = function (req, res) {
  var emailUser = req.body.email;
  _dataBase["default"].query("SELECT email_customer FROM customer WHERE email_customer = ?", [emailUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al consultar la base de datos",
        error: err
      });
    } else {
      var emailUserDB = rows[0].email_customer;
      if (emailUserDB == emailUser) {
        _dataBase["default"].query("SELECT * FROM customer WHERE email_customer = ?", [emailUser], function (err, rows) {
          if (err) {
            return res.status("202").send({
              mensaje: "Error al consultar la base de datos",
              error: err
            });
          } else {
            return res.status("200").send({
              mensaje: "Usuario consultado con exito",
              result: rows
            });
          }
        });
      }
    }
  });
};
controllerSesionCustomer.RecoverPassword = function (req, res) {
  var emailUser = req.body.email;
  var codeRecoverPassword = Math.floor(Math.random() * 1000000);
  var passwordHash = _bcryptjs["default"].hash(codeRecoverPassword, 10);
  _dataBase["default"].query("UPDATE customer SET ? WHERE email_customer = ?", [{
    pasword_customer: passwordHash
  }, emailUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al actualizar la contraseña",
        error: err
      });
    }
    _email["default"].sendMail({
      from: "2022.flash.sale@gmail.com",
      to: emailUser,
      subject: "Recuperación de contraseña",
      html: "<h1>\xA1Bienvenido a Flash!</h1>\n        <p>Se ha solicitado un cambio de contrase\xF1a, por favor ingrese el siguiente c\xF3digo para poder cambiarla.</p>\n        <p>C\xF3digo: ".concat(codeRecoverPassword, "</p>\n        <p>\xA1No te olvides de visitarnos!</p>\n        <p>Atentamente, el equipo de Flash.</p>")
    }).then(function (res) {
      return console.log("Email enviado correctamente");
    })["catch"](function (err) {
      return console.log("_________ERROR AL ENVIAR EL MAIL _________\n", err, "\n__________________________________");
    });
    return res.status("200").send({
      mensaje: "Contraseña actualizada con exito"
    });
  });
};
controllerSesionCustomer.ChangePassword = function (req, res) {
  var emailUser = req.body.email;
  var passwordUser = req.body.password;
  var newPassword = req.body.newPassword;
  _dataBase["default"].query("SELECT pasword_customer FROM customer WHERE email_customer = ?", [emailUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al consultar la base de datos",
        error: err
      });
    } else {
      if (rows.length > 0) {
        _bcryptjs["default"].compare(passwordUser, rows[0].pasword_customer, function (err, result) {
          if (result) {
            _dataBase["default"].query("UPDATE customer SET ? WHERE email_customer = ?", [{
              pasword_customer: newPassword
            }, emailUser]), function (err, rows) {
              if (err) {
                return res.status("202").send({
                  mensaje: "Error al actualizar la contraseña",
                  error: err
                });
              }
              return res.status("200").send({
                mensaje: "Contraseña actualizada con exito"
              });
            };
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
    }
  });
};
controllerSesionCustomer.UpdateEmailCustomer = function (req, res) {
  var idUser = req.body.document;
  var newEmailUser = req.body.email;
  var password = req.body.password;
  _dataBase["default"].query("SELECT pasword_customer FROM customer WHERE id_customer = ?", [idUser], function (err, rows) {
    if (err) {
      return res.status("202").send({
        mensaje: "Error al consultar la base de datos",
        error: err
      });
    } else {
      if (rows.length > 0) {
        _bcryptjs["default"].compare(password, rows[0].pasword_customer, function (err, result) {
          if (result) {
            _dataBase["default"].query("UPDATE customer SET ? WHERE id_customer = ?", [{
              email_customer: newEmailUser
            }, idUser]), function (err, rows) {
              if (err) {
                return res.status("202").send({
                  mensaje: "Error al actualizar el email",
                  error: err
                });
              }
              return res.status("200").send({
                mensaje: "Email actualizado con exito"
              });
            };
          } else {
            return res.status("202").send({
              mensaje: "Error al actualizar el email, contraseña incorrecta",
              error: err
            });
          }
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al actualizar el email, el usuario no existe",
          error: err
        });
      }
    }
  });
};
var _default = controllerSesionCustomer;
exports["default"] = _default;