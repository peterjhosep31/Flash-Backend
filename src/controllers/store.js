import { object, number, string } from "yup";
import connectionDb from "../config/dataBase/dataBase.js";

const controllerStore = {};

//ROTER POST OF STORE
controllerStore.postStore = () => {
  let idStore = req.body.idStore;
  let nameStore = req.body.descriptionStore;
  let locationStore = req.body.locationStore;
  let descriptionStore = req.body.descriptionStore;
  let idAdministrator = req.body.idAdministrator;
  let passwordAdministrator = req.body.passwordAdministrator;

  let store = object({
    idStore: number().required().integer().positive(),
    nameStore: string().required(),
    locationStore: string().required(),
    descriptionStore: string().required(),
    idAdministrator: number().required().positive(),
    passwordAdministrator: require(),
  });

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
            `INSERT INTO store SET ?`,
            {
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
};

//ROTER GET OF STORE
controllerStore.getStore = () => {
  connectionDb.query("SELECT * FROM store", (err, rows) => {
    if (!err) {
      return res.state("200").send({
        mensaje: " Error al mostrar local",
        error: err,
      });
    } else {
      return res.state("200").send({
        mensaje: "Mostrando local con exito",
        rows: rows,
      });
    }
  });
};

//ROTER PUT OF STORE
controllerStore.putStore = () => {
  let idStore = req.body.idStore;
  let nameStore = req.body.descriptionStore;
  let locationStore = req.body.locationStore;
  let descriptionStore = req.body.descriptionStore;
  let idEmployee = req.body.idEmpleyee;
  let passwordEmployee = req.body.passwordEmployee;

  let store = object({
    idStore: number().required().integer().positive(),
    nameStore: string().required(),
    locationStore: string().required(),
    descriptionStore: string().required(),
    idEmployee: number().required().positive(),
    passwordEmployee: require(),
  });

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
            [
              {
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
controllerStore.deleteStore = () => {
  let idStore = req.body.idStore;
  let idAdministrator = req.body.idAdministrator;
  let passwordAdministrator = req.body.passwordAdministrator;

  let store = object({
    idStore: number().required().integer().positive(),
    idAdministrator: number().required().positive(),
    passwordAdministrator: require(),
  });
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
