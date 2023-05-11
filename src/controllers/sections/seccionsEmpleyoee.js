import bcryptjs from "bcryptjs";

import connectionDB from "../../config/dataBase/dataBase.js";
import connectionEmail from "../../config/email/email.js";

const controllerSesionEmpleyoee = {};



controllerSesionEmpleyoee.Login = (req, res) => {
  let emailUser = req.body.email;
  let passwordUser = req.body.password;
  connectionDB.query(
    "SELECT password_employed FROM employee WHERE email_employee = ? ",
    [emailUser],
    (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          let passwordHash = rows[0].password_employee;
          bcryptjs.compare(passwordUser, passwordHash, (err, result) => {
            if (result) {
              return res.status("200").send({
                mensaje: "Usuario logueado con exito",
                result: result,
              });
            } else {
              return res.status("202").send({
                mensaje: "Error al loguear el usuario, contraseña incorrecta",
                error: err,
              });
            }
          });
        } else {
          return res.status("202").send({
            mensaje: "Error al loguear el usuario, el usuario no existe",
            error: err,
          });
        }
      } else {
        return res.status("202").send({
          mensaje: "Error al loguear el usuario",
          error: err,
        });
      }
    }
  );
};

controllerSesionEmpleyoee.UpdateDataStaff = (req, res) => {
  let idUser = req.body.document;
  let nameUser = req.body.name;
  let emailUser = req.body.email;
  let phoneUser = req.body.phone;
  let password = req.body.password;

  connectionDB.query(
    "SELECT password_employee FROM employee WHERE id_employee = ?",
    [idUser],
    (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          let passwordHash = rows[0].password_employee;
          bcryptjs.compare(password, passwordHash, (err, result) => {
            if (result) {
              connectionDB.query(
                "UPDATE employee SET name_employee = ?, email_employee = ?, phone_number_employee = ? WHERE id_employee = ?",
                [nameUser, emailUser, phoneUser, idUser],
                (err, rows) => {
                  if (!err) {
                    return res.status("200").send({
                      mensaje: "Usuario actualizado con exito",
                    });
                  } else {
                    return res.status("202").send({
                      mensaje: "Error al actualizar el usuario",
                      error: err,
                    });
                  }
                }
              );
            } else {
              return res.status("202").send({
                mensaje: "La contraseña no coincide",
                error: err,
              });
            }
          });
        } else {
          return res.status("202").send({
            mensaje: "No trae data",
            error: err,
          });
        }
      } else {
        return res.status("202").send({
          mensaje: "El unusario nio se encuentra",
          error: err,
        });
      }
    }
  );
};

controllerSesionEmpleyoee.DeleteDataStaff = (req, res) => {
  let idUser = req.body.document;
  let password = req.body.password;
  connectionDB.query(
    "SELECT password_employed FROM employee WHERE id_employee = ? ",
    [idUser],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "La contraseña no incorrecta",
          error: err,
        });
      } else if (rows.length > 0) {
        let passwordHash = rows[0].password_employee;
        bcryptjs.compare(password, passwordHash, (err, result) => {
          if (result) {
            connectionDB.query(
              "DELETE FROM employee WHERE id_employee = ?",
              [idUser],
              (err, rows) => {
                if (!err) {
                  return res.status("200").send({
                    mensaje: "Usuario eliminado con exito",
                  });
                } else {
                  return res.status("202").send({
                    mensaje: "Error al eliminar el usuario",
                    error: err,
                  });
                }
              }
            );
          } else {
            return res.status("202").send({
              mensaje: "Error al eliminar el usuario, contraseña incorrecta",
              error: err,
            });
          }
        });
      }
    }
  );
};

controllerSesionEmpleyoee.ListDataStaff = (req, res) => {
  let email = req.body.emial;
  connectionDB.query(
    "SELECT * FROM employee WHERE email_employee = ?",
    [email],
    (err, rows) => {
      if (!err) {
        return res.status("200").send({
          mensaje: "Usuarios listados con exito",
          data: rows,
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al listar los usuarios",
          error: err,
        });
      }
    }
  );
};

controllerSesionEmpleyoee.RecoverPassword = (req, res) => {
  let emailUser = req.body.email;
  let codeRecoverPassword = Math.floor(Math.random() * 1000000);
  let passwordHash = bcryptjs.hash(codeRecoverPassword, 10);
  connectionDB.query(
    "UPDATE employee SET ? WHERE email_employee = ?",
    [{
        password_employee: passwordHash,
      },
      emailUser,
    ],
    (err, rows) => {
      if (!err) {
        connectionEmail.sendMail({
            from: "2022.flash.sale@gmail.com",
            to: emailUser,
            subject: "Recuperacion de contraseña",
            html: `<h1>Recuperacion de contraseña</h1>
          <p>Usted ha solicitado recuperar su contraseña, su nueva contraseña es: ${codeRecoverPassword}</p>
          <p>Atentamente, el equipo de Flash.</p>`,
          }

          .then((res) => console.log("Correo enviado"))
          .catch((err) =>
            console.log(
              "Error al enviar el correo\n",
              err,
              "\n_____________________________"
            )
          )
        );
        return res.status("200").send({
          mensaje: "Contraseña recuperada con exito",
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al recuperar la contraseña",
          error: err,
        });
      }
    }
  );
};

controllerSesionEmpleyoee.UpdatePassword = (req, res) => {
  let emailUser = req.body.email;
  let passwordUser = req.body.password;
  let newPassword = req.body.newPassword;
  let newpasswordHash = bcryptjs.hash(newPassword, 10);
  connectionDB.query(
    "SELECT password_employee FROM employee WHERE email_employee = ?",
    [emailUser],
    (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          let passwordHash = rows[0].password_employee;
          bcryptjs.compare(passwordUser, passwordHash, (err, result) => {
            if (result) {
              connectionDB.query(
                "UPDATE employee SET ? WHERE email_employee = ?",
                [{
                    password_employee: newpasswordHash,
                  },
                  emailUser,
                ],
                (err, rows) => {
                  if (!err) {
                    return res.status("200").send({
                      mensaje: "Contraseña actualizada con exito",
                    });
                  } else {
                    return res.status("202").send({
                      mensaje: "Error al actualizar la contraseña",
                      error: err,
                    });
                  }
                }
              );
            } else {
              return res.status("202").send({
                mensaje: "Error al actualizar la contraseña, contraseña incorrecta",
                error: err,
              });
            }
          });
        } else {
          return res.status("202").send({
            mensaje: "Error al actualizar la contraseña, el usuario no existe",
            error: err,
          });
        }
      } else {
        return res.status("202").send({
          mensaje: "Error al actualizar la contraseña",
          error: err,
        });
      }
    }
  );
};

// TODO:  RUTA que utiliza es el admin para actualizar el estado de un empleado
controllerSesionEmpleyoee.UpdateState = (req, res) => {
  let idUser = req.body.document;
  let stateEmployee = req.body.state;
  let idAdmin = req.body.idAdmin;
  let passwordAdmin = req.body.password;
  connectionDB.query(
    "SELECT password_admin FROM administrator WHERE id_admin = ?",
    [idAdmin],
    (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          let passwordHash = rows[0].password_employee;
          bcryptjs.compare(passwordAdmin, passwordHash, (err, result) => {
            if (result) {
              connectionDB.query(
                "UPDATE employee SET ? WHERE id_employee = ?",
                [{
                  state_employee: stateEmployee
                }, idUser],
                (err, rows) => {
                  if (!err) {
                    return res.status("200").send({
                      mensaje: "Estado actualizado con exito",
                    });
                  } else {
                    return res.status("202").send({
                      mensaje: "Error al actualizar el estado",
                      error: err,
                    });
                  }
                }
              );
            } else {
              return res.status("202").send({
                mensaje: "Error al actualizar el estado, contraseña incorrecta",
                error: err,
              });
            }
          });
        } else {
          return res.status("202").send({
            mensaje: "Error al actualizar el estado, el usuario no existe",
            error: err,
          });
        }
      } else {
        return res.status("202").send({
          mensaje: "Error al actualizar el estado",
          error: err,
        });
      }
    }
  );
};

controllerSesionEmpleyoee.UpdateEmail = (req, res) => {
  let idUser = req.body.document;
  let emailUser = req.body.email;
  let parameter = true;
  connectionDB.query(
    "SELECT id_customer FROM customer WHERE id_customer = ?",
    [idUser],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "usuario no encontrado",
          error: err,
        });
      } else {
        if (rows.length > 0) {
          let idUserDB = rows[0];
          if (idUser != idUserDB) {
            parameter = false;
          }

          if (parameter == true) {
            connectionDB.query(
              "UPDATE customer SET ? WHERE id_customer = ?",
              [{
                  email_customer: emailUser,
                },
                idUser,
              ],
              (err, rows) => {
                if (!err) {
                  return res.status("200").send({
                    mensaje: "Email actualizado con exito",
                  });
                } else {
                  return res.status("202").send({
                    mensaje: "Error al actualizar el email",
                    error: err,
                  });
                }
              }
            );
          }
        } else {
          return res.status("202").send({
            mensaje: "Error al actualizar el email",
            error: err,
          });
        }
      }
    }
  );
};

export default controllerSesionEmpleyoee;