// import { object, number, string } from "yup";

import connectionDB from "../config/dataBase/dataBase.js";
import uploadImagesProduct from "../config/cloudinary/uploadImagesUser.js";

const controllerProduct = {};

//ROTER POST OF PRODUCTS
controllerProduct.postProduct = async (req, res) => {
  let availabilityProduct = null;

  let idProduct = req.body.idProduct;
  let nameProduct = req.body.nameProduct;
  let descriptionProduct = req.body.descriptionProduct;
  let availability = req.body.availabilityProduct;
  let amountProduct = req.body.amountProduct;
  let price = req.body.priceProduct;
  let img = req.body.image;
  let category = req.body.category;
  let offer = req.body.offer;
  let store = req.body.store;

  if (availability == 1) {
    availabilityProduct = "available";
  } else if (availability == 0) {
    availabilityProduct = "exhausted";
  } else {
    availabilityProduct = "not available";
  }

  let imgProduct = await uploadImagesProduct(img);
  let urlImgProduct = imgProduct.secure_url;
  let idImgProduct = imgProduct.public_id;

  connectionDB.query(
    "INSERT INTO product SET ?",
    {
      id_product: idProduct,
      name_product: nameProduct,
      description_product: descriptionProduct,
      availability_product: availabilityProduct,
      amount_poduct: amountProduct,
      price_product: price,
      img_product: urlImgProduct,
      id_img_product: idImgProduct,
      id_store_product: store,
      id_product_category: category,
      id_offer_product: offer,
    },
    (err, rows) => {
      if (err) {
        return res.send({
          mensaje: "Error al insertar producto",
          error: err,
        });
      } else {
        return res.send({
          mensaje: "Producto insertado con exito",
          rows: rows,
        });
      }
    }
  );
};

//ROTER GET OF PRODUCTS
controllerProduct.getProduct = async (req, res) => {
  connectionDB.query("SELECT * FROM product", (err, rows) => {
    if (err) {
      return res.status('204').send({
        mensaje: "Error al consultar productos",
        error: err,
      });
    } else {
      return res.status('200').send({
        mensaje: "Productos consultados con exito",
        rows: rows,
      });
    }
  });
};

//ROTER PUT OF PRODUCTS
controllerProduct.putProduct = async (req, res) => {
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
controllerProduct.deleteProduct = async (req, res) => {
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
