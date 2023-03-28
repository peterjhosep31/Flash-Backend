import bcryptjs from "bcryptjs";
import connectionDB from "../config/dataBase/dataBase.js";
import { object, number, string } from "yup";

const controllerProduct = {};

//ROTER POST OF PRODUCTS
controllerProduct.postProduct = () => {
  let idProduct = req.body.idProduct;
  let nameProduct = req.body.nameProduct;
  let descriptionProduct = req.body.descriptionProduct;
  let availabilityProduct = req.body.availabilityProduct;
  let amountProduct = req.body.amountProduct;

  let product = object({
    idProduct: number().positive().required(),
    nameProduct: string().required(),
    descriptionProduct: string().required(),
    availabilityProduct: string().required(),
    amountProduct: number().required().integer().positive(),
  });

  connectionDB.query(
    "INSERT INTO product SET ?",
    {
      id_product: idProduct,
      name_product: nameProduct,
      description_product: descriptionProduct,
      availability_product: availabilityProduct,
      amount_product: amountProduct,
      id_product_category: 1,
    },
    (err, rows) => {
      if (err) {
        return res.state("201").send({
          mensaje: "Error al insertar producto",
          error: err,
        });
      } else {
        return res.state("200").send({
          mensaje: "Producto insertado con exito",
          rows: rows,
        });
      }
    }
  );
};

//ROTER GET OF PRODUCTS
controllerProduct.getProduct = () => {
  connectionDB.query("SELECT * FROM product"),
    (err, rows) => {
      if (!err) {
        return res.state("200").send({
          mensaje: " Error al mostrar producto",
          error: err,
        });
      } else {
        return res.state("200").send({
          mensaje: "Mostrando producto con exito",
          rows: rows,
        });
      }
    };
};

//ROTER PUT OF PRODUCTS
controllerProduct.putProduct = () => {
  let idProduct = req.body.idProduct;
  let nameProduct = req.body.nameProduct;
  let descriptionProduct = req.body.descriptionProduct;
  let availabilityProduct = req.body.availabilityProduct;
  let amountProduct = req.body.amountProduct;
  let idEmployee = req.body.idEmpleyee;
  let passwordEmployee = req.body.passwordEmployee;

  let product = object({
    idProduct: number().required().positive(),
    nameProduct: string().required(),
    descriptionProduct: string().required(),
    availabilityProduct: string().required(),
    amountProduct: number().required().integer().positive(),
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
            `UPDATE product SET ? WHERE id_product= ?`,
            [
              {
                name_product: nameProduct,
                description_product: descriptionProduct,
                availability_product: availabilityProduct,
                amount_product: amountProduct,
              },
              idProduct,
            ],
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

//ROTER DELETE OF PRODUCTS
controllerProduct.deleteProduct = () => {
  let idProduct = req.body.idProduct;
  let idEmployee = req.body.idEmpleyee;
  let passwordEmployee = req.body.passwordEmployee;

  let product = object({
    idProduct: number().required().positive(),
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
            `DELETE product WHERE id_product= ?`,
            [idProduct],
            (err, rows) => {
              if (err) {
                return res.state("201").send({
                  mensaje: "Error al eliminar producto",
                  error: err,
                });
              } else {
                return res.state("200").send({
                  mensaje: "Producto eliminado con exito",
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

export default controllerProduct;
