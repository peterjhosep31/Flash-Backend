import bcryptjs from "bcryptjs";

import connectionDb from "../../config/dataBase/dataBase.js";
import connectionEmail from "../../config/email/email.js";

const controllerSesionAdmin = {};

controllerSesionAdmin.Registre = (req, res) => {
  let iduser = req.body.document;
  let nameuser = req.body.name;
  let urlPhoto = null;
  let emailuser = req.body.email;
  let phoneuser = req.body.phone;
  let passworduser = req.body.password;
  let accountAuthentication = req.body.emailCenter;
  let stateUser = true;
  let idPermission = 1;

  connectionDb.query(
    "INSERT INTO administrator SET ?",
    {
      id_admin: iduser,
      name_admin: nameuser,
      email_admin: emailuser,
      phone_number_admin: phoneuser,
      img_admin: urlPhoto,
      code_recover_password: idPermission,
      password_admin: passworduser,
      account_authentication_admin: accountAuthentication,
      state_admin: stateUser,
      id_permi_admin: idPrmiso,
    },
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al registrar el usuario",
          error: err,
        });
      } else {
        return res.status("200").send({
          mensaje: "Usuario registrado con exito",
        });
      }
    }
  );
};

controllerSesionAdmin.Login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  connectionDb.query(
    "SELECT password_admin FROM administrator WHERE email_admin = ?",
    [email],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al loguear usuario",
          error: err,
        });
      } else {
        if (rows.length > 0) {
          let passwordHash = rows[0].password_admin;
          bcryptjs.compare(password, passwordHash, (err, result) => {
            if (result) {
              return res.status("200").send({
                mensaje: "Usuario logueado con exito",
                data: rows,
              });
            } else {
              return res.status("202").send({
                mensaje: "Error al loguear usuario, contraseña incorrecta",
                error: err,
              });
            }
          });
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

controllerSesionAdmin.UpdateDataStaff = (req, res) => {
  let idUser = req.body.document;
  let nameUser = req.body.name;
  let phoneUser = req.body.phone;
  let emailUser = req.body.email;
  let photoAdmin = null;
  let idPhoto = null;

  connectionDb.query(
    "UPDATE administrator SET ? WHERE id_admin = ?",
    [
      {
        name_admin: nameUser,
        email_admin: emailUser,
        phone_number_admin: phoneUser,
        img_admin: photoAdmin,
        id_img_admin: idPhoto,
      },
      idUser,
    ],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al actualizar los datos del usuario",
          error: err,
        });
      } else {
        return res.status("200").send({
          mensaje: "Datos del usuario actualizados con exito",
        });
      }
    }
  );
};

controllerSesionAdmin.UpdatePhotoStaff = (req, res) => {
  let idUser = req.body.document;
  let urlPhoto = null;
  let idPhoto = null;

  connectionDb.query(
    "UPDATE administrator SET ? WHERE id_admin = ?",
    [
      {
        img_admin: urlPhoto,
        id_img_admin: idPhoto,
      },
      idUser,
    ],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al actualizar la foto del usuario",
          error: err,
        });
      } else {
        return res.status("200").send({
          mensaje: "Foto del usuario actualizada con exito",
        });
      }
    }
  );
};

controllerSesionAdmin.RecoverPassword = (req, res) => {
  let email = req.body.email;
  let codeRecoverPassword = Math.floor(Math.random() * 1000000);
  let passwordHash = bcryptjs.hash(codeRecoverPassword, 10);

  connectionDb.query(
    "UPDATE administrator SET ? WHERE email_admin = ?",
    [
      {
        code_recover_password: passwordHash,
        password_admin: codeRecoverPassword,
      },
      email,
    ],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al recuperar la contraseña",
          error: err,
        });
      } else {
        connectionEmail.sendMail(
          {
            from: "2022.flash.sale@gmail.com",
            to: email,
            subject: "Recuperación de contraseña",
            html: `<h1>Recuperación de contraseña</h1>
                <p>El código de recuperación de contraseña es: ${codeRecoverPassword}</p>
                <p>Si no solicitó recuperar su contraseña, por favor ignore este correo.</p>
                <p>Gracias por preferirnos.</p>
                `,
          }
            .then((res) => console.log("Correo enviado"))
            .catch((err) =>
              console.log(
                "_________ERROR AL ENVIAR EL MAIL _________\n",
                err,
                "\n__________________________________"
              )
            )
        );
        return res.status("200").send({
          mensaje: "Correo enviado con exito",
        });
      }
    }
  );
};

controllerSesionAdmin.UpdatePassword = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let newPassword = req.body.newPassword;
  let newpasswordHash = bcryptjs.hash(newPassword, 10);

  connectionDb.query(
    "SELECT password_admin FROM administrator WHERE email_admin = ?",
    [email],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al actualizar la contraseña",
          error: err,
        });
      } else {
        if (rows.length > 0) {
          let passwordHash = rows[0].password_admin;
          bcryptjs.compare(password, passwordHash, (err, result) => {
            if (result) {
              connectionDb.query(
                "UPDATE administrator SET ? WHERE email_admin = ?",
                [
                  {
                    password_admin: newpasswordHash,
                  },
                  email,
                ],
                (err, rows) => {
                  if (err) {
                    return res.status("202").send({
                      mensaje: "Error al actualizar la contraseña",
                      error: err,
                    });
                  } else {
                    return res.status("200").send({
                      mensaje: "Contraseña actualizada con exito",
                    });
                  }
                }
              );
            } else {
              return res.status("202").send({
                mensaje:
                  "Error al actualizar la contraseña, contraseña incorrecta",
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
      }
    }
  );
};

controllerSesionAdmin.ListDataAdmin = (req, res) => {
  let idUser = req.body.document;

  connectionDb.query(
    "SELECT * FROM administrator WHERE id_admin = ?",
    [idUser],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al listar los datos del usuario",
          error: err,
        });
      } else {
        return res.status("200").send({
          mensaje: "Datos del usuario listados con exito",
          data: rows,
        });
      }
    }
  );
};

controllerSesionAdmin.updateEmailAdmin = (req, res) => {
  let idAdmin = req.body.document;
  let newEmailAdmin = req.body.email;

  connectionDb.query(
    "SELECT id_admin FROM administrator WHERE id_admin = ?",
    [idAdmin],
    (err, rows) => {
      if (err) {
        return res.status("202").send({
          mensaje: "Error al actualizar el email del usuario",
          error: err,
        });
      } else {
        let idAdminDB = rows[0].id_admin;
        if (idAdminDB == idAdmin) {
          connectionDb.query(
            "UPDATE administrator SET ? WHERE id_admin = ?",
            [{ email_admin: newEmailAdmin }, idAdmin],
            (err, rows) => {
              if (err) {
                return res.status("202").send({
                  mensaje: "Error al actualizar el email del usuario",
                  error: err,
                });
              } else {
                return res.status("200").send({
                  mensaje: "Email del usuario actualizado con exito",
                });
              }
            }
          );
        }
      }
    }
  );
};

export default controllerSesionAdmin;
