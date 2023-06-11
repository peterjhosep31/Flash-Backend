// TODO: Ruta     http//:localhost:3105/authUser/signUpAdmin

import encrypted from "../../config/bcryptjs/encryptPassword.js";
import emailSend from "../../config/email/emailCreateUsers.js";
import connectionDb from "../../config/dataBase/dataBase.js";
import bcryptjs from "../../config/bcryptjs/encryptPassword.js";
import password from "../../helper/password.js";
import uploadImage from "../../config/cloudinary/uploadImages.js";

const controllerAuth = {};

controllerAuth.signUpAdmin = async (req, res) => {
  let emailuser = (req.body['data[email]']) ? req.body['data[email]'] : null;
  let nameuser = (req.body['data[nameUser]']) ? req.body['data[nameUser]'] : null;
  let image = (req.files['data[image]'].tempFilePath) ? req.files['data[image]'].tempFilePath : null;

  let photo = await uploadImage.uploadImagesStore(image);
  let urlImage = (photo != null) ? photo.secure_url : null;
  let idImage = (photo != null) ? photo.public_id : null;
  let passworduser = password.cretaePassword();
  let passwordHast = await bcryptjs.encryptPassword(passworduser);
  let emailCenter = nameuser.replace(/\s+/g, '_') + '@flash.com'

  let codePermission = "administrador";

  connectionDb.query("SELECT * FROM administrator WHERE email_admin = ?", [emailuser], (err, rows) => {
    if (!err) {
      if (rows.length > 0) {
        return res.status(400).send({
          mensaje: "El correo ya está registrado"
        });
      } else if (rows.length === 0) {
        connectionDb.query("INSERT INTO administrator SET ?", {
          name_admin: nameuser,
          email_admin: emailuser,
          img_admin: urlImage,
          id_img_admin: idImage,
          password_admin: passwordHast,
          rol: codePermission,
          email_center: emailCenter
        }, async (err, rows) => {
          if (err) {
            return res.status(400).send({
              mensaje: "Error al registrar el usuario",
              error: err
            });
          } else {
            await emailSend.createCenter(emailuser, nameuser, passworduser, emailCenter); 
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
  // } catch (error) {
  //   return res.status(500).send({
  //     mensaje: "Error interno del servidor"
  //   });
  // }
};

controllerAuth.signUpAdminToken = async (req, res) => {
  connectionDb.query("SELECT token FROM administrator WHERE email_admin = ?", [req.user.emailUser], async (err, rows) => {
    if (!err && rows.length > 0) {
      let compare = await bcryptjs.matchPassword(req.body.data, rows[0].token);
      if (compare) {
        return res.status(200).send({
          mensaje: "Token correcto"
        })
      } else {
        return res.status(400).send({
          mensaje: "Token incorrecto"
        })
      }
    }
  })
}

controllerAuth.signUpCustomer = async (req, res) => {
  try {
    let nameUser = (req.body.data.nameUser) ? req.body.data.nameUser : null;
    let emailUser = (req.body.data.email) ? req.body.data.email : null;
    let passwordUser = (req.body.data.password) ? req.body.data.password : null;
    let passwordHash = (passwordUser != null) ? await encrypted.encryptPassword(passwordUser) : null;
    let codePermission = "cliente";

    connectionDb.query("SELECT * FROM customer WHERE email_customer = ?", [emailUser], (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          return res.status(404).send({
            mensaje: "El usuario ya existe",
            userName: rows[0].name_customer
          });
        } else if (rows.length === 0) {
          connectionDb.query("INSERT INTO customer SET ?", {
            name_customer: nameUser,
            email_customer: emailUser,
            password_customer: passwordHash,
            rol: codePermission
          }, async (err, rows) => {
            if (err) {
              return res.status(404).send({
                mensaje: "Error al registrar el usuario",
                error: err
              });
            } else {
              await emailSend.confirmUser(emailUser, nameUser)
              return res.status(200).send({
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