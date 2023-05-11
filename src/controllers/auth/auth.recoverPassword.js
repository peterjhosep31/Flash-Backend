import connectionDB from "../../config/dataBase/dataBase.js";
import password from "../../helper/password.js";
import bcryptjs from "../../config/bcryptjs/encryptPassword.js";
import emailSend from "../../config/email/emialRecoverPassword.js"

const controllerRecoverPassword = {};

controllerRecoverPassword.recoverPassword = async (req, res) => {
  let email = (req.body.data.email) ? req.body.data.email : null;
  try {

    await connectionDB.query("SELECT code_recover FROM administrator WHERE email_admin = ?", [email], async (err, rows) => {
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
        console.log(email);
        await connectionDB.query("SELECT code_recover FROM customer WHERE email_customer = ?", [email], async (err, rows) => {
          console.log(rows, "\n", err);
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

controllerRecoverPassword.updatePassword = async (req, res) => {
  try {
    let email = (req.body.data.email) ? req.body.data.email : null;
    let newPassword = (req.body.data.password) ? req.body.data.password : null;
    await connectionDB.query("SELECT email_admin FROM administrator WHERE email_admin = ?", [email], async (err, rows) => {
      if (rows.length > 0) {
        let codeHast = await bcryptjs.encryptPassword(newPassword);
        await connectionDB.query("UPDATE administrator SET password_admin = ?, code_recover = ? WHERE email_admin = ?", [codeHast, null, email], async (err, rows) => {
          if (rows) {
            return res.status(200).send({
              mensaje: "Contraseña actualizada"
            })
          } else if (err) {
            return res.status(403).send({
              mensaje: "Ocurrio un errorr",
            })
          }
        })
      } else if (rows.length === 0) {
        await connectionDB.query("SELECT email_customer FROM customer WHERE email_customer = ?", [email], async (err, rows) => {
          if (rows.length > 0) {
            let codeHast = await bcryptjs.encryptPassword(newPassword);
            await connectionDB.query("UPDATE customer SET password_customer = ? WHERE email_customer = ?", [codeHast, email], async (err, rows) => {
              if (!err) {
                return res.status(200).send({
                  mensaje: "Contraseña actualizada"
                })
              } else {
                console.log(err);
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
      } else {
        return res.status(403).send({
          mensaje: "El usuario no existe",
          err
        })
      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Ocurrio un error"
    })
  }
}


controllerRecoverPassword.recoverPasswordUserCode = async (req, res) => {
  try {
    console.log(req.body.data.email);
    let codeRecover = password.recoverUser();
    let email = (req.body.data.email) ? req.body.data.email : null;

    await connectionDB.query("SELECT name_admin FROM administrator WHERE email_admin = ?", [email], async (err, rows) => {
      if (rows.length > 0) {
        let nameAdmin = rows[0].name_admin
        await connectionDB.query("UPDATE administrator SET code_recover = ? WHERE email_admin = ?", [codeRecover, email], async (err, rows) => {
          if (!err) {
            await emailSend.recoverPassword(codeRecover);
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
        await connectionDB.query("SELECT name_customer FROM customer WHERE email_customer = ?", [email], async (err, rows) => {
          if (rows.length > 0) {
            let nameCustomer = rows[0].name_customer
            await connectionDB.query("UPDATE customer SET code_recover = ? WHERE email_customer = ?", [codeRecover, email], async (err, rows) => {
              if (!err) {
                await emailSend.recoverPassword(codeRecover);
              }
              return res.status(200).send({
                mensaje: "Se envio un correo electronico"
              })
            })
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

controllerRecoverPassword.recoverPasswordStore = () => {
  try {
    let newPassword = req.body.data.password;
    let passwordHast = bcryptjs.encryptPassword(newPassword);
    let emailEmployee = req.body.data.email;
    let nameStore = req.body.data.store;

    connectionDB.query("UPDATE store SET password_store = ? WHERE name_store = ? ", [nameStore], async (err, rows) => {
      if (!err) {
        await connectionEmail.sendMail({
          from: "2022.flash.sale@gmail.com",
          to: emailEmployee,
          subject: "Recuperar contraseña",
          html: `<h1>
          <p>Hola ${nameEmployee}</p>
          <p>La nueva contraseña de la tienda es ${newPassword}</p>
          <p>Para iniciar sesion nuevamente debe de hacerlo con esta contraseña otorgada</p>
          </h1>`
        }).then((res) => {
          console.log("Send email")
        }).catch((err) => {
          console.log(err);
        })
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
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    })
  }
}

export default controllerRecoverPassword;