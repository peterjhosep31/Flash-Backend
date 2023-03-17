const controllerCategory = {};
import { object, number, string } from "yup";

//ROTER POST OF CATEGORY
controllerCategory.postCategory = () => {
  let nameCategory = req.body.nameCategory;
  let descriptionCategory = req.body.descriptionCategory;
  let idCategory = req.body.idCategory;

  let category = object({
    nameCategory: string().required(),
    descriptionCategory: string().required(),
    idCategory: number().required().integer().positive(),
  });

  req.getConnection((err, conn) => {
    if (!err) {
      conn.query("INSERT INTO category SET ?", {
        nameCategory: nameCategory,
        descriptionCategory: descriptionCategory,
        idCategory: idCategory,
      }),
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
        };
    }
  });
};

//ROTER GET OF CATEGORY
controllerCategory.getCategory = () => {
  conn.query("SELECT * FROM category"),
    (err, rows) => {
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
    };
};

//ROTER PUT OF CATEGORY
controllerCategory.putCategory = () => {
  let nameCategory = req.body.nameCategory;
  let descriptionCategory = req.body.descriptionCategory;
  let idCategory = req.body.idCategory;

  let category = object({
    nameCategory: string().required(),
    descriptionCategory: string().required(),
    idCategory: number().required().integer().positive(),
  });

  req.getConnection((err, conn) => {
    if (!err) {
      conn.query(
        `UPDATE category set nameCategory = ${nameCategory} descriptionCategory = ${descriptionCategory} idCategory=${idCategory}`
      ),
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
        };
    }
  });
};

//ROTER DELETE OF CATEGORY
controllerCategory.deleteidCategory = () => {
  let idCategory = req.body.idCategory;

  req.getConnection((err, conn) => {
    if (!err) {
      conn.query(`DELETE product WHERE idCategory=${idCategory}`);
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
  });
};

export default controllerCategory;
