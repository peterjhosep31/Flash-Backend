// import { object, number, string } from "yup";

import connectionDB from "../config/dataBase/dataBase.js";
import uploadImages from "../config/cloudinary/uploadImagesUser.js";
import utilities from "../helper/productUseful.js"

const controllerProduct = {};
controllerProduct.postProduct = async (req, res) => {
  let idProduct = (req.body.codeProduct) ? req.body.codeProduct : null;
  let nameProduct = (req.body.name) ? req.body.name : null;
  let descriptionProduct = (req.body.description) ? req.body.description : null;
  let availability = (req.body.availability) ? req.body.availability : null;
  let availabilityProduct = await utilities.availability(availability);
  
  let amountProduct = (req.body.amount) ? req.body.amount : null;
  let priceProduct = (req.body.price) ? req.body.price : null;
  let imgProductRute = (req.body.image) ? req.body.image : null;
  // let imgProduct = (imgProductRute == null || imgProductRute == "") ? null : await uploadImages.uploadImagesUser(imgProductRute);
  let urlImgProduct = (imgProduct != null) ? imgProduct.secure_url : null;
  let idImgProduct = (imgProduct != null) ? imgProduct.public_id : null;

  let categoryProduct = (req.body.category) ? req.body.category : null;
  let offerProduct = (req.body.offer) ? req.body.offer : null;
  let storeProduct = (req.body.store) ? req.body.store : null;

  // await connectionDB.query("INSER INTO product SET ?", {
  //   id_product: idProduct,
  //   name_product: nameProduct,
  //   description_product: descriptionProduct,
  //   availability_product: availabilityProduct,
  //   amount_product: amountProduct,
  //   price_product: priceProduct,
  //   img_product: urlImgProduct,
  //   id_img_product: idImgProduct,
  //   id_store_product: storeProduct,
  //   id_product_category: categoryProduct,
  //   id_offer_product: offerProduct
  // }, async (err, rows) => {
  //   if (err) return res.status(500).send({
  //     mensaje: "Error al insertar producto",
  //     error: err
  //   })

  //   return res.status(200).send({
  //     mensaje: "Producto insertado con exito",
  //     rows: rows
  //   })
  // })

};

controllerProduct.getProduct = async (req, res) => {
  connectionDB.query("SELECT * FROM product", (err, rows) => {
    if (err) {
      return res.status(404).send({
        mensaje: "Error al consultar productos",
        error: err,
      });
    } else {
      return res.status("200").send({
        mensaje: "Productos consultados con exito",
        rows: rows,
      });
    }
  });
};

controllerProduct.putProduct = async (req, res) => {
  let idProduct = (req.body.code_product) ? req.body.code_product : null;
  let nameProduct = (req.body.name) ? req.body.name : null;
  let descriptionProduct = (req.body.description) ? req.body.description : null;
  let availability = (req.body.availability) ? req.body.availability : null;
  let availabilityProduct = null;
  let amountProduct = (req.body.amount) ? req.body.amount : null;
  let priceProduct = (req.body.price) ? req.body.price : null;
  let imageProductRoute = (req.body.image) ? req.body.image : null;

  let idEmployee = (req.user.idUser) ? req.user.idUser : null;
  let passwordEmployee = (req.body.password) ? req.body.password : null;

/*
  connectionDB.query(
    "SELECT password_employed FROM employee WHERE id_employee = ?",
    [idEmployee],
    (err, rows) => {
      if (err) {
        return res.status(404).send({
          mensaje: "La contraseña es incorrecta -_-",
          error: err,
        });
      }

      let passwordDB = rows[0].password_employed;
      bcryptjs.compare(passwordDB, passwordEmployee, (err, result) => {
        if (result) {

          connectionDB.query('SELECT * FROM product WHERE id_product = ?', [idProduct], (err, rows) => {
            if (err) {
              return res.status(204).send({
                mensaje: "El producto no existe",
              })
            } else {
              nameProduct = (isEmpty(nameProduct)) ? rows[0].name_product : nameProduct;
              descriptionProduct = (isEmpty(descriptionProduct)) ? rows[0].description_product : descriptionProduct;
              availabilityProduct = (isEmpty(availabilityProduct)) ? rows[0].availability_product : availabilityProduct;
              amountProduct = (isEmpty(amountProduct)) ? rows[0].amount_poduct : amountProduct;

            }
          })

          connectionDB.query(
            'UPDATE product SET ? WHERE id_product= ?',
            [{
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
  */
};

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