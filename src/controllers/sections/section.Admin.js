import connectionDB from "../../config/dataBase/dataBase.js";
import bcryptjs from "../../config/bcryptjs/encryptPassword.js";
import uploadImageUser from "../../config/cloudinary/uploadImagesUser.js";
import deleteImage from "../../config/cloudinary/deleteImages.js";


const adminEdit = {};

adminEdit.updateProfile = async (req, res) => {
  console.log(req.files);
  // console.log(req.files.data.tempFilePath);

  let emailUserConcurrent = req.user.emailUser;

  let nameUSer = (req.body['data[name]']) ? req.body['data[name]'] : null;
  let emailUser = (req.body['data[email]']) ? req.body['data[email]'] : null;
  // let direccion = (req.body.data.addres) ? req.body.data.addres : null;
  let imageUser = (req.files) ? req.files.data.tempFilePath : null;
  let photoUSer = (imageUser != null) ? await uploadImageUser.uploadImagesUser(imageUser) : null;
  let urlPhoto = (photoUSer != null) ? photoUSer.url : null;
  let idPhoto = (photoUSer != null) ? photoUSer.id : null;
  
  connectionDB.query("SELECT * FROM administrator WHERE email_center = ?", [emailUserConcurrent], async (err, rows) => {
    if (!err && rows.length > 0) {

      let nameAdmin = (nameUSer != null) ? nameUSer : rows[0].name_admin;
      let emialAdmin = (emailUser != null) ? emailUser : rows[0].email_admin;
      let imgAdmin = (urlPhoto != null) ? urlPhoto : rows[0].img_admin;
      let idImgAdmin = (idPhoto != null) ? idPhoto : rows[0].id_img_admin;
      connectionDB.query("UPDATE administrator SET name_admin  = ?, email_admin = ?, img_admin = ?, id_img_admin = ? WHERE email_admin = ?", [nameAdmin, emialAdmin, imgAdmin, idImgAdmin, emailUserConcurrent], (err, rows) => {
        if (!err) {
          console.log("entra");
          if (rows.affectedRows > 0) {
            console.log(rows);
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
};

adminEdit.getData = async (req, res) => {
  connectionDB.query("SELECT * FROM administrator WHERE email_admin = ?", [req.user.emailUser], (err, rows) => {
    console.log(rows);
    if (rows.length > 0) {
      return res.status(200).send({
        mensaje: "Datos encontrados",
        rows: rows
      })
    } else {
      return res.status(404).send({
        mensaje: "No se encontraron datos",
        err
      })
    }
  })
};

adminEdit.getSmalls =async (req, res) => {
  connectionDB.query("SELECT * FROM administrator WHERE rol = 'administrador' LIMIT 9", (err, rows) => {
    if (rows) {
      return res.status(200).send({
        mensaje: "Datos encontrados",
        rows: rows
      })
    } else {
      return res.status(404).send({
        mensaje: "No se encontraron datos",
        err
      })
    }
  })
}


export default adminEdit;