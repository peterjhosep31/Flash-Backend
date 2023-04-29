import connectionDB from "../config/dataBase/dataBase.js";
import uploadImages from "../config/cloudinary/uploadImagesUser.js"


const controllerStore = {};

//ROTER POST OF STORE
controllerStore.postStore = async (req, res) => {
  let codeStore = (req.body.code) ? req.body.code : null;
  let nameStore = (req.body.name) ? req.body.name : null;
  let createFolderCloudinary = (nameStore != null) ? await uploadImages.createFolder(nameStore) : null;

  let locationStore = (req.body.location) ? req.body.location : null;
  let descriptionStore = (req.body.description) ? req.body.description : null;
  let phoneStore = (req.body.phone) ? req.body.phone : null;
  let routeImage = (req.body.image) ? req.body.image : null;
  let imageStore = (routeImage != null) ? await uploadImages.uploadImagesStore(routeImage, createFolderCloudinary.path) : null;

  let categoryStore = req.body.category;
  let idAdmin = req.user.id;
  let passwordAdmin = req.body.password;

/*
  connectionDB.query(
    "SELECT password_admin FROM administrator WHERE id_admin = ?",
    [idAdministrator],
    (err, rows) => {
      if (err) {
        return res.status(202).send({
          mensaje: "Administrador no encontrado",
          error: err,
        });
      }

      let passwordDB = rows[0].password_admin;
      bcryptjs.compare(passwordDB, passwordAdministrator, (err, result) => {
        if (result) {
          connectionDB.query(
            `INSERT INTO store SET ?`, {
              id_store: idStore,
              name_store: nameStore,
              location_store: locationStore,
              description_store: descriptionStore,
              id_emp_str: 1,
            },
            (err, rows) => {
              if (err) {
                return res.state("201").send({
                  mensaje: "Error al editar producto",
                  error: err,
                });
              } else {
                return res.state("200").send({
                  mensaje: "Producto editado con exito",
                  rows: rows,
                });
              }
            }
          );
        }
      });
    }
  );
  */
};

//ROTER GET OF STORE
controllerStore.getStore = async (req, res) => {
  await connectionDB.query("SELECT * FROM store", (err, rows) => {
    if (!err) {
      return res.status("200").send({
        mensaje: "Mostrano locales",
        error: rows,
      });
    } else {
      return res.status("202").send({
        mensaje: "Error al mostrar local",
        rows: err,
      });
    }
  });
};

//ROTER PUT OF STORE
controllerStore.putStore = (req, res) => {
  let idStore = req.body.idStore;
  let nameStore = req.body.descriptionStore;
  let locationStore = req.body.locationStore;
  let descriptionStore = req.body.descriptionStore;
  let idEmployee = req.body.idEmpleyee;
  let passwordEmployee = req.body.passwordEmployee;

  connectionDB.query(
    "SELECT password_employed FROM employee WHERE id_employee = ?",
    [idEmployee],
    (err, rows) => {
      if (err) {
        return res.status(202).send({
          mensaje: "Empleado no encontrado",
          error: err,
        });
      }

      let passwordDB = rows[0].password_employed;
      bcryptjs.compare(passwordDB, passwordEmployee, (err, result) => {
        if (result) {
          connectionDB.query(
            `UPDATE store SET ? WHERE id_store= ?`,
            [{
                id_store: idStore,
                name_store: nameStore,
                location_store: locationStore,
                description_store: descriptionStore,
                id_emp_str: 1,
              },
              idStore,
            ],
            (err, rows) => {
              if (err) {
                return res.state("201").send({
                  mensaje: "Error al editar local",
                  error: err,
                });
              } else {
                return res.state("200").send({
                  mensaje: "Local editado con exito",
                  rows: rows,
                });
              }
            }
          );
        }
      });
    }
  );
};

//ROTER DELETE OF STORE
controllerStore.deleteStore = (req, res) => {
  let idStore = req.body.idStore;
  let idAdministrator = req.body.idAdministrator;
  let passwordAdministrator = req.body.passwordAdministrator;

  connectionDB.query(
    "SELECT password_admin FROM administrator WHERE id_admin = ?",
    [idAdministrator],
    (err, rows) => {
      if (err) {
        return res.status(202).send({
          mensaje: "Administrador no encontrado",
          error: err,
        });
      }

      let passwordDB = rows[0].password_admin;
      bcryptjs.compare(passwordDB, passwordAdministrator, (err, result) => {
        if (result) {
          connectionDB.query(
            `DELETE store WHERE id_store= ?`,
            [idStore],
            (err, rows) => {
              if (err) {
                return res.state("201").send({
                  mensaje: "Error al eliminar local",
                  error: err,
                });
              } else {
                return res.state("200").send({
                  mensaje: "Local eliminado con exito",
                  rows: rows,
                });
              }
            }
          );
        }
      });
    }
  );
};

export default controllerStore;