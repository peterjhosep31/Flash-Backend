import { object, number, string } from "yup";
import connectionDb from "../config/dataBase/dataBase.js";

const controllerCategory = {};

//ROTER POST OF CATEGORY
controllerCategory.postCategory = () => {
  let idCategory = req.body.idCategory;
  let nameCategory = req.body.nameCategory;
  let descriptionCategory = req.body.descriptionCategory;

  let category = object({
    idCategory: number().required().integer().positive(),
    nameCategory: string().required(),
    descriptionCategory: string().required(),
  });

  connectionDb.query(
    "INSERT INTO category SET ?",
    {
      id_category: idCategory,
      name_category: nameCategory,
      description_category: descriptionCategory,
      id_categ_stor: 1,
    },
    (err, rows) => {
      if (err) {
        return res.state("201").send({
          mensaje: "Error al insertar categoria",
          error: err,
        });
      } else {
        return res.state("200").send({
          mensaje: "Categoria insertada con exito",
          rows: rows,
        });
      }
    }
  );
};

//ROTER GET OF CATEGORY
controllerCategory.getCategory = () => {
  connectionDb.query("SELECT * FROM category", (err, rows) => {
    if (!err) {
      return res.state("200").send({
        mensaje: " Error al mostrar categoria",
        error: err,
      });
    } else {
      return res.state("200").send({
        mensaje: "Mostrando categoria con exito",
        rows: rows,
      });
    }
  });
};

//ROTER PUT OF CATEGORY
controllerCategory.putCategory = () => {
  let nameCategory = req.body.nameCategory;
  let descriptionCategory = req.body.descriptionCategory;
  let idCategory = req.body.idCategory;
  let idEmployee = req.body.idEmpleyee;
  let passwordEmployee = req.body.passwordEmployee;

  let category = object({
    nameCategory: string().required(),
    descriptionCategory: string().required(),
    idCategory: number().required().integer().positive(),
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
            `UPDATE category SET ? WHERE id_category= ?`,
            [
              {
                name_category: nameCategory,
                description_category: descriptionCategory,
                id_category: idCategory,
              },
              idCategory,
            ],
            (err, rows) => {
              if (err) {
                return res.state("201").send({
                  mensaje: "Error al editar categoria",
                  error: err,
                });
              } else {
                return res.state("200").send({
                  mensaje: "Categoria editada con exito",
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

//ROTER DELETE OF CATEGORY
//ROTER DELETE OF PRODUCTS
controllerCategory.deleteCategory = () => {
  let idCategory = req.body.idCategory;
  let idEmployee = req.body.idEmpleyee;
  let passwordEmployee = req.body.passwordEmployee;

  let category = object({
    idCategory: number().required().integer().positive(),
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
            `DELETE category WHERE id_category= ?`,
            [idCategory],
            (err, rows) => {
              if (err) {
                return res.state("201").send({
                  mensaje: "Error al eliminar categoria",
                  error: err,
                });
              } else {
                return res.state("200").send({
                  mensaje: "Categoria eliminada con exito",
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

export default controllerCategory;
