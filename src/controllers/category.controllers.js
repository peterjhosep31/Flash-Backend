import connectionDb from "../config/dataBase/dataBase.js";

const controllerCategory = {};

controllerCategory.postCategory = (req, res) => {
  let idCategory = req.body.idCategory;
  let nameCategory = req.body.nameCategory;
  let descriptionCategory = req.body.descriptionCategory;

  connectionDb.query(
    "INSERT INTO category SET ?", {
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
controllerCategory.getCategory = (req, res) => {
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
controllerCategory.putCategory = (req, res) => {
  let nameCategory = req.body.nameCategory;
  let descriptionCategory = req.body.descriptionCategory;
  let idCategory = req.body.idCategory;
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
            `UPDATE category SET ? WHERE id_category= ?`,
            [{
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
controllerCategory.deleteCategory = (req, res) => {
  let idCategory = req.body.idCategory;
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