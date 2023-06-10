import connectionDB from "../../config/dataBase/dataBase.js";
import password from "../../helper/password.js";
import bcryptjs from "../../config/bcryptjs/encryptPassword.js";
import emailSend from "../../config/email/emialRecoverPassword.js"

const controllerRecoverPassword = {};

controllerRecoverPassword.recoverPassword = async (req, res) => {
  let email = (req.body.data.email) ? req.body.data.email : null;
  try {
    connectionDB.query("SELECT code_recover FROM administrator WHERE email_admin = ?", [email], (err, rows) => {
      if (rows.length > 0) {
        let codePassword = req.body.data.code;
        let codeRecover = rows[0].code_recover;
        if (codePassword == codeRecover) {
          return res.status(200).send({
            mensaje: "Codigo valido"
          })
        } else {
          return res.status(402).send({
            mensaje: "Codigo invalido"
          })
        }
      } else if (rows.length == 0) {
        connectionDB.query("SELECT code_recover FROM customer WHERE email_customer = ?", [email], (err, rows) => {
          if (rows.length > 0) {
            let codePassword = req.body.data.code;
            if (codePassword == rows[0].code_recover) {
              return res.status(200).send({
                mensaje: "Codigo valido"
              })
            } else {
              return res.status(402).send({
                mensaje: "Codigo invalido",
                err
              })
            }
          } else {
            return res.status(402).send({
              mensaje: "El usuario no Existe"
            })
          }
        })
      } else {
        return res.status(402).send({
          mensaje: "El usuario no Existe"
        })
      }
    })

  } catch (error) {
    res.status(500).send({
      mensaje: "Ocurrio un error"
    })
  }
}

controllerRecoverPassword.updatePassword = (req, res) => {
  try {
    let email = (req.body.data.email) ? req.body.data.email : null;
    let newPassword = (req.body.data.password) ? req.body.data.password : null;
    connectionDB.query("SELECT email_admin FROM administrator WHERE email_admin = ?", [email], async (err, rows) => {
      if (rows.length > 0) {
        let codeHast = await bcryptjs.encryptPassword(newPassword);
        connectionDB.query("UPDATE administrator SET password_admin = ? WHERE email_admin = ?", [codeHast, email], (err, rows) => {
          if (!err) {
            return res.status(200).send({
              mensaje: "Contraseña actualizada"
            })
          } else {
            return res.status(402).send({
              mensaje: "Ocurrio un error",
              err
            })
          }
        })
      } else if (rows.length === 0) {
        connectionDB.query("SELECT email_customer FROM customer WHERE email_customer = ?", [email], async (err, rows) => {
          if (rows.length > 0) {
            let codeHast = await bcryptjs.encryptPassword(newPassword);
            connectionDB.query("UPDATE customer SET password_customer = ? WHERE email_customer = ?", [codeHast, email], (err, rows) => {
              if (!err) {
                return res.status(200).send({
                  mensaje: "Contraseña actualizada"
                })
              } else {
                return res.status(402).send({
                  mensaje: "Ocurrio un error",
                  err,
                }
                )
              }
            })
          } else if (rows.length == 0) {
            return res.status(403).send({
              mensaje: "El usuario no existe"
            })
          }
        })
      }
    })
  } catch (error) {
    res.status(500).send({
      mensaje: "Ocurrio un error"
    })
  }
}

controllerRecoverPassword.recoverPasswordUserCode = async (req, res) => {
  let codeRecover = password.codePassword();
  let email = (req.body.data.email) ? req.body.data.email : null;

  connectionDB.query("SELECT name_admin FROM administrator WHERE email_admin = ?", [email], (err, rows) => {
    if (!err && rows.length > 0) {
      let nameAdmin = rows[0].name_admin
      connectionDB.query("UPDATE administrator SET code_recover = ? WHERE email_admin = ?", [codeRecover, email], async (err, rows) => {
        if (!err) {
          await emailSend.recoverPassword(email, codeRecover, nameAdmin);
          return res.status(200).send({
            mensaje: "Se envio un correo electronico"
          })
        } else {
          return res.status(402).send({
            mensaje: "error",
            err
          })
        }
      })
    } else if (rows.length == 0) {
      connectionDB.query("SELECT name_customer FROM customer WHERE email_customer = ?", [email], async (err, rows) => {
        if (rows.length > 0) {
          let nameCustomer = rows[0].name_customer
          connectionDB.query("UPDATE customer SET code_recover = ? WHERE email_customer = ?", [codeRecover, email], async (err, rows) => {
            if (!err) {
              await emailSend.recoverPassword(email, codeRecover, nameCustomer);
              return res.status(200).send({
                mensaje: "correo enviado"
              })
            }
          })
        } else {
          return res.status(402).send({
            mensaje: "El usuario no Existe"
          })
        }
      })

    } else {
      return res.status(402).send({
        mensaje: "El usuario no Existe",
        err
      })
    }
  })
}

controllerRecoverPassword.recoverPasswordStore = () => {
  try {
    let newPassword = req.body.data.password;
    let password
    let emailEmployee = req.body.data.email;

    let email = req.body.data.email;
    connectionDB.query("UPDATE store SET password_store = ? WHERE id_store = ? ", [], async (err, rows) => {
      if (!err) {

      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    })
  }
}

export default controllerRecoverPassword;