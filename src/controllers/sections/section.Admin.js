import connectionDB from "../../config/dataBase/dataBase.js";
import bcryptjs from "../../config/bcryptjs/encryptPassword.js";
import uploadImageUser from "../../config/cloudinary/uploadImagesUser.js";
import deleteImage from "../../config/cloudinary/deleteImages.js";

const adminEdit = {};

adminEdit.updateProfile = async (req, res) => {
  try {
    let emailUserConcurrent = (req.user.emailUser) ? req.user.emailUser : null;

    let nameUSer = (req.body.data.name) ? req.body.data.name : null;
    let emailUser = (req.body.data.email) ? req.body.data.email : null;
    let phoneuser = (req.body.data.phoneNumber) ? req.body.data.phoneNumber : null;
    let passwordUser = (req.body.data.password) ? req.body.data.password : null;
    let imageUser = (req.body.data.image) ? req.body.data.image : null;
    let photoUSer = (imageUser != null) ? await uploadImageUser.uploadImagesUser(imageUser) : null;
    let urlPhoto = null;
    let idPhoto = null;
    if (photoUSer != null) {
      urlPhoto = photoUSer.secure_url;
      idPhoto = photoUSer.public_id;
    }

    let passwordConcurret = null;
    let bann = true;
    if (emailUser != null || passwordUser != null) {
      passwordConcurret = (req.body.data.password) ? req.body.data.password : null;
      connectionDB.query("SELECT password_admin FROM administrator WHERE email_admin = ?", [emailUserConcurrent], async (err, rows) => {
        if (!err && rows.length > 0) {
          let comparePassword = await bcryptjs.matchPassword(passwordConcurret, rows[0].password_admin);
          if (comparePassword) {
            bann = false;
          } else {
            return res.status(403).send({
              mensaje: "Contraseña incorrecta"
            })
          }
        }
      })
    }
    console.log(bann);
    if (bann) {
      connectionDB.query("SELECT name_admin, phone_number_admin, img_admin, id_img_admin FROM administrator WHERE email_admin = ?", [emailUserConcurrent], async (err, rows) => {
        if (!err && rows.length > 0) {
          let nameAdmin = (nameUSer != null) ? nameUSer : rows[0].name_admin;
          let phoneAdmin = (phoneuser != null) ? phoneuser : rows[0].phone_number_admin;
          let imgAdmin = (urlPhoto != null) ? urlPhoto : rows[0].img_admin;
          let idImgAdmin = (idPhoto != null) ? idPhoto : rows[0].id_img_admin;
          let deleteImge = (photoUSer != null) ? await deleteImage.deleteImage(rows[0].id_img_admin) : null;
          console.log(deleteImge);
          connectionDB.query("UPDATE administrator SET name_admin = ?, phone_admin = ?, img_admin = ?, id_img_admin = ? WHERE email_admin = ?", [nameAdmin, phoneAdmin, imgAdmin, idImgAdmin, emailUserConcurrent], (err, rows) => {
            if (!err) {
              if (rows.affectedRows > 0) {

                return res.status(200).send({
                  mensaje: "Datos actualizados con exito",
                  rows: rows
                })
              } else {
                return res.status(404).send({
                  mensaje: "No se encontraron datos para actualizar",
                  rows: rows
                })
              }
            } else {
              return res.status(500).send({
                mensaje: "Error en el servidor",
                error: err
              })
            }
          })
        }
      })
    } else {
      connectionDB.query("SELECT * FROM administrator WHERE email_admin = ?", [emailUserConcurrent], async (err, rows) => {
        if (!err && rows.length > 0) {
          let nameAdmin = (nameUSer != null) ? nameUSer : rows[0].name_admin;
          let phoneAdmin = (phoneuser != null) ? phoneuser : rows[0].phone_number_admin;
          let imgAdmin = (urlPhoto != null) ? urlPhoto : rows[0].img_admin;
          let idImgAdmin = (idPhoto != null) ? idPhoto : rows[0].id_img_admin;
          let passwordAdmin = (passwordUser != null) ? await bcryptjs.encryptPassword(passwordUser) : rows[0].password_admin;
          connectionDB.query("UPDATE administrator SET name_admin = ?, phone_admin = ?, img_admin = ?, id_img_admin = ?, password_admin = ? WHERE email_admin = ?", [nameAdmin, phoneAdmin, imgAdmin, idImgAdmin, passwordAdmin, emailUserConcurrent], (err, rows) => {
            if (!err) {
              if (rows.affectedRows > 0) {
                return res.status(200).send({
                  mensaje: "Datos actualizados con exito",
                  rows: rows
                })
              } else {
                return res.status(404).send({
                  mensaje: "No se encontraron datos para actualizar",
                  rows: rows
                })
              }
            } else {
              return res.status(500).send({
                mensaje: "Error en el servidor",
                error: err
              })
            }
          })
        }
      })
    }
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
      error: error
    })
  }
}

adminEdit.getData = async (req, res) => {

};


export default adminEdit;