import deleteImages from "../config/cloudinary/deleteImages.js";
import uploadImages from "../config/cloudinary/uploadImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";
import emailSend from "../config/email/emailCreateUsers.js";
import connectionDB from "../config/dataBase/dataBase.js";
import password from "../helper/password.js";

const controllerStore = {};

controllerStore.postStore = async (req, res) => {
  try {
    let id = (req.body.data.idEmploado) ? req.body.data.idEmploado : null;
    let nameEmployee = (req.body.data.nombreEmpleado) ? req.body.data.nombreEmpleado : null;
    let emailEmployee = (req.body.data.email) ? req.body.data.email : null;

    let nameStore = (req.body.data.nameStore) ? req.body.data.nameStore : null;
    let location = (req.body.data.ubicacion) ? req.body.data.ubicacion : null;
    let passwordStore = password.cretaePassword();
    let passwordHast = await bcryptjs.encryptPassword(passwordStore);
    let emailStore = nameStore.replace(/\s+/g, '_') + '_' + location.replace(/\s+/g, '_') + '@flash.com';
    let emailAdmin = req.user.emailUser;
    connectionDB.query("SELECT id_admin FROM administrator WHERE email_admin = ?", [emailAdmin], (err, rows) => {
      if (!err && rows.length > 0) {
        let idAdmin = rows[0].id_admin;
        connectionDB.query("INSERT INTO store SET ? ", {
          name_store: nameStore,
          location_store: location,
          email_store: emailStore,
          password_store: passwordHast,
          rol: 'empleado',
          id_admin: idAdmin
        }, async (err, rows) => {
          if (!err) {
            connectionDB.query("SELECT id_store FROM store WHERE email_store = ?", [emailStore], (err, rows) => {
              if (!err && rows.length > 0) {
                let idStore = rows[0].id_store;
                connectionDB.query("INSERT INTO employee SET ?", {
                  name_employee: nameEmployee,
                  email_employee: emailEmployee,
                  state_employee: 'asset',
                  id_store: idStore,
                  id_employee: id
                }, async (err, rows) => {
                  if (!err) {
                    let sendEmail = await emailSend.createStore(emailEmployee, nameEmployee, nameStore, emailStore, passwordStore);
                    console.log(sendEmail);
                    return res.status(200).send({
                      mensaje: "Tienda registrada con exito."
                    });
                  } else {
                    return res.status(202).send({
                      mensaje: "Error al registrar la tienda el empleado ya existe.",
                      error: err
                    });
                  }
                });
              } else {
                return res.status(202).send({
                  mensaje: "Error"
                });
              }
            });
          } else {
            return res.status(202).send({
              mensaje: "Error al registrar la tienda."
            });
          }
        });
      } else {
        return res.status(202).send({
          mensaje: "Error al obtener el administrador"
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Ocurrio un error"
    });
  }
};

controllerStore.getStore = async (req, res) => {
  try {
    connectionDB.query("SELECT * FROM store", (err, rows) => {
      if (rows.length > 0) {
        return res.status("200").send({
          mensaje: "Tiendas obtenidas",
          error: rows
        });
      } else if (rows.length === 0) {
        return res.status("202").send({
          mensaje: "No hay locales"
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al mostrar local",
          err: err
        });
      }
    });
  } catch (error) {
    return res.status("500").send({
      mensaje: "Ocurrio un error"
    });
  }
};

controllerStore.getStoreAdmin = async (req, res) => {
  try {
    let email = (req.user.emailUser) ? req.user.emailUser : null;
    connectionDB.query("SELECT id_admin FROM administrator WHERE email_admin = ?", [email], (err, rows) => {
      if (!err && rows.length > 0) {
        let id = rows[0].id_admin;
        connectionDB.query("SELECT e.name_employee, e.email_employee, e.state_employee , s.name_store, s.id_store, s.location_store, s.email_store FROM employee e INNER JOIN store s ON e.id_store = s.id_store WHERE e.id_store IN (SELECT id_store FROM store WHERE id_admin = ?)", [id], (err, rows) => {
          if (!err && rows.length > 0) {
            return res.status(200).send({
              mensaje: "Locales obtenidos",
              data: rows
            });
          } else {
            return res.status(202).send({
              mensaje: "Error al obtener los locales",
              error: err
            });
          }
        });
      } else {
        return res.status(202).send({
          mensaje: "Error al obtener el administrador"
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Ocurrio un error"
    });
  }
};

controllerStore.putStore = async (req, res) => {
  let code = (req.body.data.code) ? req.body.data.code : null;
  let nameStore = (req.body.data.nameStore) ? req.body.data.nameStore : null;
  let phone = (req.body.data.phone) ? req.body.data.phone : null;
  let description = (req.body.data.description) ? req.body.data.description : null;
  let image = (req.body.data.image) ? req.body.data.image : null;
  let photo = (image != null) ? await uploadImages.uploadImagesStore(image, nameStore) : null;
  let urlPhoto = (photo != null) ? photo.secure_url : null;
  let idPhoto = (photo != null) ? photo.public_id : null;

  connectionDB.query("SELECT * FROM store WHERE id_store = ?", [code], (err, rows) => {
    if (!err && rows.length > 0) {
      let nameDB = (nameStore != null) ? nameStore : rows[0].name_store;
      let phoneDB = (phone != null) ? phone : rows[0].phone_number_store;
      let descriptionDB = (description != null) ? description : rows[0].description_store;
      let imageDB = (urlPhoto != null) ? urlPhoto : rows[0].image_store;
      let idPhotoDB = (idPhoto != null) ? idPhoto : rows[0].id_image_store;
      connectionDB.query("UPDATE store SET name_store = ?, phone_number_store = ?, description_store = ?, image_store = ?, id_image_store = ? WHERE id_store = ?", [nameDB, phoneDB, descriptionDB, imageDB, idPhotoDB, code], (err, rows) => {
        if (!err) {
          return res.status(200).send({
            mensaje: "Local actualizado con exito"
          });
        } else {
          return res.status(202).send({
            mensaje: "Error al actualizar el local",
            error: err
          });
        }
      });
    }
  });
};

controllerStore.deleteStore = async (req, res) => {
  try {
    let code = req.params.id ? req.params.id : null;
    let idUser = req.user.idUser ? req.user.idUser : null;
    let passwordAdministrator = req.body.data.password ? req.body.data.password : null;

    connectionDB.query("SELECT id_store FROM store WHERE id_store = ?", [code], (err, rows) => {
      if (rows.length > 0) {
        let idStore = rows[0].id_store
        connectionDB.query("SELECT email_employee FROM employee WHERE id_store = ?", [idStore], (err, rows) => {
          if (!err && rows.length > 0) {
            let email = rows[0].email_employee;
            connectionDB.query("DELETE FROM employee WHERE email_employee = ?", [email], (err, rows) => {
              if (!err) {
                connectionDB.query("DELETE FROM store WHERE id_store = ?", [idStore], (err, rows) => {
                  if (!err) {
                    return res.status(200).send({
                      mensaje: "Local eliminado junto con el empleado."
                    });
                  } else {
                    return res.status(500).send({
                      mensaje: "Ocurrio unor",
                      err
                    });
                  }
                });
              } else {
                console.log(err);
                return res.status(500).send({
                  mensaje: "Ocurri",
                  err
                })
              }
            });
          } else {
            return res.status(403).send({
              mensaje: "No se puede eliminar el local porque tiene empleados"
            });
          }
        });
      } else {
        return res.status(403).send({
          mensaje: "jhgf",
          err
        });
      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Ocurrio un error"
    });
  }
};

export default controllerStore