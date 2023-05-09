import connectionDB from "../../config/dataBase/dataBase.js";
import connectionEmail from "../../config/email/email.js";
import password from "../../helper/password.js";
import bcryptjs from "../../config/bcryptjs/encryptPassword.js";


const controllerRecoverPassword = {};
let bann = true;
let typeUser = null;

controllerRecoverPassword.recoverPassword = async (req, res) => {
  console.log(bann);
  let email = (req.body.data.email) ? req.body.data.email : null;
  let newPassword = (req.body.data.password) ? req.body.data.password : null;
  try {
    if (bann == true) {
      await connectionDB.query("SELECT code_recover FROM administrator WHERE email_admin = ?", [email], async (err, rows) => {
        if (rows.length > 0) {
          let codePassword = req.body.data.code;
          let codeRecover = rows[0].code_recover;

          let compareCode = await bcryptjs.matchPassword(codePassword, codeRecover);
          console.log(compareCode);
          if (compareCode) {
            bann = false;
            typeUser = "administrator";
            return res.status(200).send({
              mensaje: "Codigo valido"
            })
          } else {
            return res.status(402).send({
              mensaje: "Codigo invalido"
            })
          }
        } else if (rows.length == 0) {
          await connectionDB.query("SELECT code_recover FROM customer WHERE email_customer = ?", [email], async (err, rows) => {
            if (rows.length > 0) {
              let codePassword = req.body.data.code;
              let compareCode = await bcryptjs.matchPassword(rows[0].code_recover, codePassword);
              if (compareCode) {
                bann = false;
                typeUser = "customer";
                return res.status(200).send({
                  mensaje: "Codigo valido"
                })
              } else {
                return res.status(402).send({
                  mensaje: "Codigo invalido"
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
    } else if (bann == false) {
      bann = true
      typeUser = null;
      if (typeUser == "administrator") {
        let codeHast = await bcryptjs.encryptPassword(newPassword);
        await connectionDB.query("UPDATE administrator SET password_admin = ? WHERE email_admin = ?", [codeHast, email], async (err, rows) => {
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
      } else if (typeUser == "customer") {
        let codeHast = await bcryptjs.encryptPassword(newPassword);
        await connectionDB.query("UPDATE customer SET password_customer = ? WHERE email_customer = ?", [codeHast, email], async (err, rows) => {
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
      }
    }
  } catch (error) {
    res.status(500).send({
      mensaje: "Ocurrio un error"
    })
  }
}

controllerRecoverPassword.recoverPasswordUserCode = async (req, res) => {
  console.log(req.body);
    let codeRecover = password.recoverUser();
    let codeHast = await bcryptjs.encryptPassword(codeRecover);
    console.log(codeHast);
    let email = (req.body.data.email) ? req.body.data.email : null;

    await connectionDB.query("SELECT name_admin FROM administrator WHERE email_admin = ?", [email], async (err, rows) => {
      if (rows.length > 0) {
        let nameAdmin = rows[0].name_admin
        await connectionDB.query("UPDATE administrator SET code_recover = ? WHERE email_admin = ?", [codeHast, email], async (err, rows) => {
          if (!err) {
            console.log(rows);
            await connectionEmail.sendMail({
              from: "2022.flash.sale@gmail.com",
              to: email,
              subject: "Recuperar contraseña",
              html: `<h1>
            <p>Hola ${nameAdmin}</p>
            <p>Para recuperar tu contraseña ingresa al siguiente codigo</p>
            <p>Codigo:  ${codeRecover}</p>
            <p>Si no solicitaste una recuperación de contraseña ignora este correo</p>
            <p>Gracias</p>
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
      } else if (rows.length == 0) {
        await connectionDB.query("SELECT name_customer FROM customer WHERE email_customer = ?", [email], async (err, rows) => {
          if (rows.length > 0) {
            let nameCustomer = rows[0].name_customer
            await connectionDB.query("UPDATE customer SET code_recover = ? WHERE email_customer = ?", [codeHast, email], async (err, rows) => {
              if (!err) {
                await connectionEmail.sendMail({
                  from: "2022.flash.sale@gmail.com",
                  to: email,
                  subject: "Recuperar contraseña",
                  html: `<h1>
                <p></p>Hola ${nameCustomer}</p>
                <p>Para recuperar tu contraseña ingresa al siguiente codigo</p>
                <p>Codigo:  ${codeRecover}</p>
                <p>Si no solicitaste una recuperación de contraseña ignora este correo</p>
                <p>Gracias</p>
              </h1>`
                }).then((res) => {
                  console.log("Send email")
                }).catch((err) => {
                  console.log(err);
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
      if(!err) {

      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    })
  }
}

export default controllerRecoverPassword;