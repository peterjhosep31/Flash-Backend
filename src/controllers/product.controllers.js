// import { object, number, string } from "yup";

import connectionDB from "../config/dataBase/dataBase.js";
import uploadImages from "../config/cloudinary/uploadImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";

const controllerProduct = {};

controllerProduct.postProduct = async (req, res) => {
  try {
    let nameProduct = (req.body.data.name) ? req.body.data.name : null;
    let descriptionProduct = (req.body.data.description) ? req.body.data.description : null;
    let availability = (req.body.data.availability) ? req.body.data.availability : null;

    let amountProduct = (req.body.data.amount) ? req.body.data.amount : null;
    let priceProduct = (req.body.data.price) ? req.body.data.price : null;
    let imgProductRute = (req.body.data.image) ? req.body.data.image : null;

    let categoryProduct = (req.body.data.category) ? req.body.data.category : null;
    let offerProduct = (req.body.data.offer) ? req.body.data.offer : null;
    let storeProduct = req.user.emailUser;

    await connectionDB.query("SELECT id_store, name_store FROM store WHERE email_store = ?", [storeProduct], async (err, rows) => {
      console.log("entro");
      console.log(err);
      if (!err) {
        if (rows.length > 0) {
          let idStore = rows[0].id_store;
          let nameStore = rows[0].name_store;
          let imgProduct = (imgProductRute == null || imgProductRute == "") ? null : await uploadImages.uploadImagesProducts(imgProductRute, nameStore);
          let urlImgProduct = (imgProduct != null) ? imgProduct.secure_url : null;
          let idImgProduct = (imgProduct != null) ? imgProduct.public_id : null;
          await connectionDB.query("INSERT INTO product SET ?", {
            name_product: nameProduct,
            description_product: descriptionProduct,
            availability_product: 'available',
            amount_poduct: amountProduct,
            price_product: priceProduct,
            img_product: urlImgProduct,
            id_img_product: idImgProduct,
            id_store_product: idStore,
            id_product_category: categoryProduct,
            id_offer_product: 1
          }, (err, rows) => {
            console.log(err);
            if (err) return res.status(403).send({
              mensaje: "Error al insertar producto",
              error: err
            })

            return res.status(200).send({
              mensaje: "Producto insertado con exito",
              rows: rows
            })
          })
        }
      } else {
        return res.status(403).send({
          mensaje: "Error al insertar producto",
          error: err
        })
      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
    })
  }
};

controllerProduct.getProductStore = async (req, res) => {
  try {
    let email = req.user.emailUser;
    await connectionDB.query("SELECT id_store FROM store WHERE email_store = ?", [email], async (err, rows) => {
      if (!err) {
        let idStore = rows[0].id_store;
        await connectionDB.query("SELECT * FROM product WHERE id_store_product  = ?", [idStore], (err, rows) => {
          console.log(err);
          if (err) return res.status(403).send({
            mensaje: "Error al consultar productos",
            error: err
          })

          return res.status(200).send({
            mensaje: "Productos consultados con exito",
            rows: rows
          })
        })
      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
    })
  }
}

controllerProduct.getProduct = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
    });
  }
};

controllerProduct.putProduct = async (req, res) => {
  try {
    let idProduct = (req.body.data.idProduct) ? req.body.data.idProduct : null;
    let nameProduct = (req.body.data.name) ? req.body.data.name : null;
    let descriptionProduct = (req.body.data.description) ? req.body.data.description : null;
    let availability = (req.body.data.availability) ? req.body.data.availability : null;
    let amountProduct = (req.body.data.amount) ? req.body.data.amount : null;
    let priceProduct = (req.body.data.price) ? req.body.data.price : null;
    let imageProductRoute = (req.body.data.image) ? req.body.data.image : null;

    await connectionDB.query("SELECT * FROM product WHERE id_product = ?", [idProduct], async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          let nameProductDB = (nameProduct != null) ? nameProduct : rows[0].name_product;
          let descriptionProductDB = (descriptionProduct != null) ? descriptionProduct : rows[0].description_product;
          let availabilityProductDB = (availability != null) ? availability : rows[0].availability_product;
          let amountProductDB = (amountProduct != null) ? amountProduct : rows[0].amount_poduct;
          let priceProductDB = (priceProduct != null) ? priceProduct : rows[0].price_product;
          let imageProductDB = (imageProductRoute != null) ? await uploadImages.uploadImagesProducts(imageProductRoute, nameProductDB) : null;
          let urlImgProduct = (imageProductDB != null) ? imageProductDB.secure_url : null;
          let idImgProduct = (imageProductDB != null) ? imageProductDB.public_id : null;

          await connectionDB.query("UPDATE product SET ? WHERE id_product = ?", [{
            name_product: nameProductDB,
            description_product: descriptionProductDB,
            availability_product: 'available',
            amount_poduct: amountProductDB,
            price_product: priceProductDB,
            img_product: urlImgProduct,
            id_img_product: idImgProduct
          }, idProduct], (err, rows) => {
            if (!err) {
              return res.status(200).send({
                mensaje: "Producto actualizado con exito",
                rows: rows
              })
            }
          })

        } else {
          return res.status(403).send({
            mensaje: "Error al consultar producto",
            error: err
          })
        }
      } else {
        return res.status(403).send({
          mensaje: "Error al consultar producto",
          error: err
        })
      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
    })
  }

};

controllerProduct.deleteProduct = async (req, res) => {
  try {
    let idProduct = req.body.data.idProduct;
    let password = req.body.data.password;
    let emailUser = req.user.emailUser;

    await connectionDB.query("SELECT password_store FROM store WHERE email_store = ?", [emailUser], async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          let passwordDB = rows[0].password_store;
          let passwordCompare = await bcryptjs.matchPassword(password, passwordDB);
          if (passwordCompare) {
            await connectionDB.query("DELETE FROM product WHERE id_product = ?", [idProduct], (err, rows) => {
              if (!err) {
                return res.status(200).send({
                  mensaje: "Producto eliminado con exito",
                  rows: rows
                })
              } else {
                return res.status(403).send({
                  mensaje: "Error al eliminar producto",
                  error: err
                })
              }
            })
          } else {
            return res.status(403).send({
              mensaje: "Contraseña incorrecta",
              error: err
            })
          }
        } else {
          return res.status(403).send({
            mensaje: "Error al consultar contraseña",
            error: err
          })
        }
      } else {
        return res.status(403).send({
          mensaje: "Error al consultar contraseña",
          error: err
        })
      }
    })

  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
    })
  }
};

export default controllerProduct;