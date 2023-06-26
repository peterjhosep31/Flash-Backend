import connectionDB from "../../config/dataBase/dataBase.js";
import uploadImageUser from "../../config/cloudinary/uploadImagesUser.js";

const controllerSesionCustomer = {};

controllerSesionCustomer.updateData = async (req, res) => {
  console.log(req.files)

  let emailUser = req.user.emailUser;
  let name = req.body ? req.body["data[name]"] : "anonymous";
  let email = req.body ? req.body["data[email]"] : null;
  let phone = req.body ? req.body["data[phone]"] : null;
  let address = req.body ? req.body["data[addres]"] : null;
  let routeImg = req.files ? req.files.data.tempFilePath || req.files.data.tempFilePath : null;
  let photoProfile =
    routeImg != null ? await uploadImageUser.uploadImagesUser(routeImg) : null;
  let urlImage = photoProfile != null ? photoProfile.secure_url : null;
  let idImage = photoProfile != null ? photoProfile.public_id : null;


  connectionDB.query(
    "SELECT * FROM customer WHERE email_customer = ?",
    [emailUser],
    (err, rows) => {
      if (!err && rows.length > 0) {
        let nameDB = name == null ? rows[0].name_customer : name;
        let emailDB = email == null ? rows[0].email_customer : email;
        let phoneDB = phone == null ? rows[0].phone_customer : phone;
        let addressDB = address == null ? rows[0].address_customer : address;
        let urlImageDB = urlImage == null ? rows[0].img_customer : urlImage;
        let idImageDB = idImage == null ? rows[0].id_img_customer : idImage;
        connectionDB.query(
          "UPDATE customer SET name_customer = ?, email_customer = ?, phone_number_customer = ?, address_customer = ?, img_customer = ?, id_img_customer = ? WHERE email_customer = ?",
          [
            nameDB,
            emailDB,
            phoneDB,
            addressDB,
            urlImageDB,
            idImageDB,
            emailUser,
          ],
          (err, rows) => {
            if (!err) {
              return res.status(200).send({
                mensaje: "Datos actualizados con exito.",
              });
            } else {
              return res.status(404).send({
                mensaje: "Error al actualizar los datos",
                err,
              });
            }
          }
        );
      }
    }
  );
};

controllerSesionCustomer.deleteCount = async (req, res) => {
  let emailUser = req.user.emailUser;
  connectionDB.query(
    "DELETE FROM customer WHERE email_customer = ?",
    [emailUser],
    (err, rows) => {
      if (!err) {
        return res.status(200).send({
          mensaje: "Cuenta eliminada con exito.",
        });
      } else {
        return res.status(404).send({
          mensaje: "Error al eliminar la cuenta",
          err,
        });
      }
    }
  );
};

controllerSesionCustomer.getData = async (req, res) => {
  connectionDB.query(
    "SELECT * FROM customer WHERE email_customer  =?",
    [req.user.emailUser],
    (err, rows) => {
      if (err) {
        res.status(500).json({
          message: "Error",
          data: err,
        });
      } else {
        res.status(200).json({
          message: "Success",
          rows,
        });
      }
    }
  );
};

controllerSesionCustomer.getShopping = async (req, res) => {
  let customer = req.user.emailUser;
  connectionDB.query(
    "SELECT * FROM buys WHERE email_customer = ?",
    [customer],
    (err, rows) => {
      if (err) {
        return res.status(404).send({
          mensaje: "no se encontraron compras",
        });
      } else {
        return res.status(200).send({
          mensaje: "las compras",
          data: rows,
        });
      }
    }
  );
};

export default controllerSesionCustomer;
