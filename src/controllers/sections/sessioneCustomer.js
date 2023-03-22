import bcryptjs from "bcryptjs";

import connectionDB from "../../config/dataBase/dataBase.js";
import connectionEmail from "../../config/email/email.js";

const controllerSesionCustomer = {};

controllerSesionCustomer.Registre = (req, res) => {
  let idUser = req.body.document;
  let nameUser = req.body.name;
  let phoneUser = req.body.phone;
  let emailUser = req.body.email;
  let addresssUser = req.body.address;
  let passwordUser = req.body.password;
  let passwordHash = bcryptjs.hash(passwordUser, 10);

  connectionDB.query(
    `INSERT INTO customer SET ?`,
    {
      id_customer: idUser,
      name_customer: nameUser,
      //! Cambiar admin por customer
      phone_number_admin: phoneUser,
      email_customer: emailUser,
      address_customer: addresssUser,
      pasword_customer: passwordHash,
    },
    (err, rows) => {
      if (!err) {
        connectionEmail
          .sendMail({
            from: "2022.flash.sale@gmail.com",
            to: emailUser,
            subject: "Bienvenido a Flash",
            html: `<h1>¡Bienvenido a Flash!</h1>
          <p>Gracias por registrarte en nuestra plataforma, ahora podrás disfrutar de las mejores ofertas y promociones de tus tiendas favoritas.</p>
          <p>¡No te olvides de visitarnos!</p>
          <p>Atentamente, el equipo de Flash.</p>`,
          })
          .then((res) => console.log("Email enviado correctamente"))
          .catch((err) =>
            console.log(
              "_________ERROR AL ENVIAR EL MAIL _________\n",
              err,
              "\n__________________________________"
            )
          );

        return res.status("200").send({
          mensaje: "Usuario insertado con exito",
          result: result,
        });
      } else if (err.code == "ER_DUP_ENTRY") {
        return res.status("202").send({
          mensaje: "Error al insertar usuario, el usuario ya existe",
          error: err,
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al insertar usuario",
          error: err,
        });
      }
    }
  );
};

controllerSesionCustomer.Login = (req, res) => {
  let emailUser = req.body.email;
  let passwordUser = req.body.password;
  connectionDB.query(
    "SELECT pasword_customer FROM customer WHERE email_customer = ?",
    [emailUser],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al consultar la base de datos",
          error: err,
        });
      } else {
        if (rows.length > 0) {
          bcryptjs.compare(
            passwordUser,
            rows[0].pasword_customer,
            (err, result) => {
              if (result) {
                return res.status("200").send({
                  mensaje: "Usuario logueado con exito",
                  result: result,
                });
              } else {
                return res.status("202").send({
                  mensaje: "Error al loguear usuario, contraseña incorrecta",
                  error: err,
                });
              }
            }
          );
        } else {
          return res.status("202").send({
            mensaje: "Error al loguear usuario, el usuario no existe",
            error: err,
          });
        }
      }
    }
  );
};

controllerSesionCustomer.UpdateDataStaff = (req, res) => {
  let idUser = req.body.document;
  let nameUser = req.body.name;
  let phoneUser = req.body.phone;
  let emailUser = req.body.email;
  let addresssUser = req.body.address;
  let passwordUser = req.body.password;
  connectionDB.query(
    "SELECT pasword_customer FROM customer WHERE id_customer = ?",
    [idUser],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al consultar la base de datos",
          error: err,
        });
      } else {
        let passwordUserDB = rows[0].pasword_customer;
        if (passwordUserDB == passwordUser) {
          connectionDB.query(
            "UPDATE customer SET name_customer = ?, phone_number_admin = ?, email_customer = ?, address_customer = ? WHERE id_customer = ?",
            [nameUser, phoneUser, emailUser, addresssUser, idUser],
            (err, rows) => {
              if (err) {
                return res.status("202").send({
                  mensaje: "Error al actualizar el usuario",
                  error: err,
                });
              } else {
                return res.status("200").send({
                  mensaje: "Usuario actualizado con exito",
                });
              }
            }
          );
        }
      }
    }
  );
};

controllerSesionCustomer.DeleteDataStaff = (req, res) => {
  let idUser = req.body.document;
  let passwordUser = req.body.password;
  connectionDB.query(
    "SELECT pasword_customer FROM customer WHERE id_customer = ?",
    [idUser],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al consultar la base de datos",
          error: err,
        });
      } else {
        let passwordUserDB = rows[0].pasword_customer;
        if (passwordUserDB == passwordUser) {
          connectionDB.query(
            "DELETE FROM customer WHERE id_customer = ?",
            [idUser],
            (err, rows) => {
              if (err) {
                return res.status("202").send({
                  mensaje: "Error al eliminar el usuario",
                  error: err,
                });
              } else {
                return res.status("200").send({
                  mensaje: "Usuario eliminado con exito",
                });
              }
            }
          );
        }
      }
    }
  );
};

controllerSesionCustomer.ListDataStaff = (req, res) => {
  let emailUser = req.body.email;
  connectionDB.query(
    "SELECT email_customer FROM customer WHERE email_customer = ?",
    [emailUser],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al consultar la base de datos",
          error: err,
        });
      } else {
        let emailUserDB = rows[0].email_customer;
        if (emailUserDB == emailUser) {
          connectionDB.query(
            "SELECT * FROM customer WHERE email_customer = ?",
            [emailUser],
            (err, rows) => {
              if (err) {
                return res.status("202").send({
                  mensaje: "Error al consultar la base de datos",
                  error: err,
                });
              } else {
                return res.status("200").send({
                  mensaje: "Usuario consultado con exito",
                  result: rows,
                });
              }
            }
          );
        }
      }
    }
  );
};

controllerSesionCustomer.RecoverPassword = (req, res) => {
  let emailUser = req.body.email;
  let codeRecoverPassword = Math.floor(Math.random() * 1000000);
  let passwordHash = bcryptjs.hash(codeRecoverPassword, 10);
  connectionDB.query(
    "UPDATE customer SET ? WHERE email_customer = ?",
    [
      {
        pasword_customer: passwordHash,
      },
      emailUser,
    ],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al actualizar la contraseña",
          error: err,
        });
      }
      connectionEmail
        .sendMail({
          from: "2022.flash.sale@gmail.com",
          to: emailUser,
          subject: "Recuperación de contraseña",
          html: `<h1>¡Bienvenido a Flash!</h1>
        <p>Se ha solicitado un cambio de contraseña, por favor ingrese el siguiente código para poder cambiarla.</p>
        <p>Código: ${codeRecoverPassword}</p>
        <p>¡No te olvides de visitarnos!</p>
        <p>Atentamente, el equipo de Flash.</p>`,
        })
        .then((res) => console.log("Email enviado correctamente"))
        .catch((err) =>
          console.log(
            "_________ERROR AL ENVIAR EL MAIL _________\n",
            err,
            "\n__________________________________"
          )
        );
      return res.status("200").send({
        mensaje: "Contraseña actualizada con exito",
      });
    }
  );
};

controllerSesionCustomer.ChangePassword = (req, res) => {
  let emailUser = req.body.email;
  let passwordUser = req.body.password;
  let newPassword = req.body.newPassword;
  connectionDB.query(
    "SELECT pasword_customer FROM customer WHERE email_customer = ?",
    [emailUser],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al consultar la base de datos",
          error: err,
        });
      } else {
        if (rows.length > 0) {
          bcryptjs.compare(
            passwordUser,
            rows[0].pasword_customer,
            (err, result) => {
              if (result) {
                connectionDB.query(
                  "UPDATE customer SET ? WHERE email_customer = ?",
                  [
                    {
                      pasword_customer: newPassword,
                    },
                    emailUser,
                  ]
                ),
                  (err, rows) => {
                    if (err) {
                      return res.status("202").send({
                        mensaje: "Error al actualizar la contraseña",
                        error: err,
                      });
                    }
                    return res.status("200").send({
                      mensaje: "Contraseña actualizada con exito",
                    });
                  };
              } else {
                return res.status("202").send({
                  mensaje:
                    "Error al actualizar la contraseña, contraseña incorrecta",
                  error: err,
                });
              }
            }
          );
        } else {
          return res.status("202").send({
            mensaje: "Error al actualizar la contraseña, el usuario no existe",
            error: err,
          });
        }
      }
    }
  );
};

controllerSesionCustomer.UpdateEmailCustomer = (req, res) => {
  let idUser = req.body.document;
  let newEmailUser = req.body.email;
  let password = req.body.password;
  connectionDB.query(
    "SELECT pasword_customer FROM customer WHERE id_customer = ?",
    [idUser],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al consultar la base de datos",
          error: err,
        });
      } else {
        if (rows.length > 0) {
          bcryptjs.compare(
            password,
            rows[0].pasword_customer,
            (err, result) => {
              if (result) {
                connectionDB.query(
                  "UPDATE customer SET ? WHERE id_customer = ?",
                  [
                    {
                      email_customer: newEmailUser,
                    },
                    idUser,
                  ]
                ),
                  (err, rows) => {
                    if (err) {
                      return res.status("202").send({
                        mensaje: "Error al actualizar el email",
                        error: err,
                      });
                    }
                    return res.status("200").send({
                      mensaje: "Email actualizado con exito",
                    });
                  };
              } else {
                return res.status("202").send({
                  mensaje:
                    "Error al actualizar el email, contraseña incorrecta",
                  error: err,
                });
              }
            }
          );
        } else {
          return res.status("202").send({
            mensaje: "Error al actualizar el email, el usuario no existe",
            error: err,
          });
        }
      }
    }
  );
};

export default controllerSesionCustomer;
