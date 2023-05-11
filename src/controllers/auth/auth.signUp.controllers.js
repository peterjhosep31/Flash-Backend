// TODO: Ruta     http//:localhost:3105/authUser/signUpAdmin

import connectionDb from "../../config/dataBase/dataBase.js";
import encrypted from "../../config/bcryptjs/encryptPassword.js";
import emailSend from "../../config/email/emailCreateUsers.js";

const controllerAuth = {};

controllerAuth.signUpAdmin = async (req, res) => {
  try {
    let emailuser = (req.body.data.email) ? req.body.data.email : null;
    let nameuser = (req.body.data.nameUser) ? req.body.data.nameUser : null;
    let passworduser = (req.body.data.password) ? req.body.data.password : null;
    let passwordHash = (passworduser != null) ? await encrypted.encryptPassword(passworduser) : null;
    let codePermission = "administrador";

    connectionDb.query("SELECT * FROM administrator WHERE email_admin = ?", [emailuser], async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          return res.status(400).send({
            mensaje: "El correo ya está registrado",
          });
        } else if (rows.length === 0) {
          await connectionDb.query("INSERT INTO administrator SET ?", {
            name_admin: nameuser,
            email_admin: emailuser,
            password_admin: passwordHash,
            rol: codePermission,
          }, async (err, rows) => {
            if (err) {
              return res.status(400).send({
                mensaje: "Error al registrar el usuario",
                error: err
              });
            } else {
              await emailSend.confirmUser(emailuser, nameuser)
              return res.status(200).send({
                mensaje: "Usuario registrado con éxito"
              });
            }
          });
        }
      } else if (err) {
        return res.status(400).send({
          mensaje: "Error al registrar el usuario",
          error: err
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error interno del servidor"
    });
  }
};

controllerAuth.signUpEmployee = async (req, res) => {
  try {
    let nameUser = (req.body.name) ? req.body.name : null;
    let emailUser = (req.body.email) ? req.body.email : null;
    let store = (req.body.idStore) ? req.body.idStore : null;

    await connectionDb.query("SELECT * FROM employee WHERE email_employee = ?", [emailUser], async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          return res.status("202").send({
            mensaje: "El usuario ya existe",
            userName: rows[0].name_employee
          });
        } else if (rows.length === 0) {
          await connectionDb.query("INSERT INTO employee SET ?", {
            name_employee: nameUser,
            email_employee: emailUser,
            id_store: store
          }, (err, rows) => {
            if (err) {
              return res.status("202").send({
                mensaje: "Error al registrar el usuario",
                error: err
              });
            } else {
              return res.status("200").send({
                mensaje: "Usuario registrado con exito"
              });
            }
          }
          );
        }
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      mensaje: 'Error al registrar el usuario',
      error: error.message,
    });
  };
};

controllerAuth.signUpCustomer = async (req, res) => {
  try {
    let nameUser = (req.body.data.name) ? req.body.data.name : null;
    let emailUser = (req.body.data.email) ? req.body.data.email : null;
    let passwordUser = (req.body.data.password) ? req.body.data.password : null;
    let passwordHash = (passwordUser != null) ? await encrypted.encryptPassword(passwordUser) : null;
    let codePermission = "cliente";

    await connectionDb.query("SELECT * FROM customer WHERE email_customer = ?", [emailUser], async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          return res.status("202").send({
            mensaje: "El usuario ya existe",
            userName: rows[0].name_customer
          });
        } else if (rows.length === 0) {
          await connectionDb.query("INSERT INTO customer SET ?", {
            name_customer: nameUser,
            email_customer: emailUser,
            password_customer: passwordHash,
            rol: codePermission
          }, (err, rows) => {
            if (err) {
              return res.status("202").send({
                mensaje: "Error al registrar el usuario",
                error: err
              });
            } else {
              emailSend.confirmUser(emailUser, nameUser)
              return res.status("200").send({
                mensaje: "Usuario registrado con exito"
              });
            }
          }
          );
        }
      }
    });
  } catch (error) {
    return res.status("500").send({
      mensaje: "Error interno del servidor",
      error: error
    });
  }
};



export default controllerAuth;