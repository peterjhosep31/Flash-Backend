import connectionDB from "../config/dataBase/dataBase.js";
import uploadImages from "../config/cloudinary/uploadImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";
import { query } from "express";

const controllerProduct = {};

controllerProduct.postProduct = async (req, res) => {
  console.log(req.body);
  try {
    let nameProduct = (req.body['data[name]']) ? req.body['data[name]'] : null;
    let descriptionProduct = (req.body['data[description]']) ? req.body['data[description]'] : null;
    let availability = (req.body['data[availability]']) ? req.body['data[availability]'] : null;
    let offerProduct = (req.body['data[discount]']) ? req.body['data[discount]'] : 0;
    let amountProduct = (req.body['data[amount]']) ? req.body['data[amount]'] : null;
    let priceProduct = (req.body['data[price]']) ? req.body['data[price]'] : null;
    let imgProductRute = (req.files['data[image]'].tempFilePath) ? req.files['data[image]'].tempFilePath : null;
    let categoryProduct = (req.body['data[category]']) ? req.body['data[category]'] : null;
    let storeProduct = req.user.emailUser;
    console.log("entro aca");
    connectionDB.query("SELECT id_store, name_store FROM store WHERE email_store = ?", [storeProduct], async (err, rows) => {
      if (!err && rows.length > 0) {
        let idStore = rows[0].id_store;
        let nameStore = rows[0].name_store;
        let imgProduct = (imgProductRute == null || imgProductRute == "") ? null : await uploadImages.uploadImagesProducts(imgProductRute);
        let urlImgProduct = (imgProduct != null) ? imgProduct.secure_url : null;
        let idImgProduct = (imgProduct != null) ? imgProduct.public_id : null;
        connectionDB.query("INSERT INTO product SET ?", {
          name_product: nameProduct,
          description_product: descriptionProduct,
          availability_product: 'available',
          amount_poduct: amountProduct,
          price_product: priceProduct,
          img_product: urlImgProduct,
          id_img_product: idImgProduct,
          id_store_product: idStore,
          id_product_category: categoryProduct,
          dicount: offerProduct
        }, (err, rows) => {
          console.log(err);
          if (err) return res.status(403).send({
            mensaje: "Error al insertar producto",
            error: err
          });
          return res.status(200).send({
            mensaje: "Producto insertado con exito",
            rows: rows
          });
        })
      } else {
        return res.status(403).send({
          mensaje: "Error al insertar producto",
          error: err
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error al insertar producto"
    })
  }
};

controllerProduct.getProductStore = async (req, res) => {
  try {
    let email = req.user.emailUser;
    connectionDB.query("SELECT id_store FROM store WHERE email_store = ?", [email], async (err, rows) => {
      if (!err && rows.length > 0) {
        let idStore = rows[0].id_store;
        connectionDB.query("SELECT * FROM product WHERE id_store_product  = ?", [idStore], (err, rows) => {
          console.log(err);
          if (err) return res.status(403).send({
            mensaje: "Error al consultar productos",
            error: err
          });
          return res.status(200).send({
            mensaje: "Productos consultados con exito",
            rows: rows
          });
        });
      } else {
        return res.status(403).send({
          mensaje: "Error al consultar productos",
          error: err
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    });
  }
};

controllerProduct.getProduct = async (req, res) => {
  let allProducts = null;
  try {
    connectionDB.query("SELECT * FROM product order by id_product DESC", (err, rows) => {
      if (err) {
        return res.status(404).send({
          mensaje: "Error al consultar productos",
          error: err
        });
      } else {
        return res.status("200").send({
          mensaje: "Productos consultados con exito",
          rows: rows
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    });
  }
};

<<<<<<< HEAD
controllerProduct.getProductDate = async (req, res) => {
  try {
    connectionDB.query("SELECT * FROM product order by data_product DESC limit 7", (err, rows) => {
      if (err) {
        return res.status(404).send({
          mensaje: "Error al consultar productos",
          error: err
        });
      } else {
        return res.status("200").send({
          mensaje: "Productos consultados con exito",
          rows: rows
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    });
  }
};

=======
>>>>>>> c238501855e0b8d5fdc067ca98794b63dfa1f81b
controllerProduct.getProductOne = async (req, res) => {
  try {
    connectionDB.query("SELECT id_product FROM products WHERE id_product = ?", [req.params.code], (err, rows) => {
      if (err) {
        return res.status(404).send({
          mensaje: "Error al consultar productos",
          error: err
        });
      } else {
        return res.status("200").send({
          mensaje: "Productos consultados con exito",
          rows: rows
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    });
  }
};

controllerProduct.putProduct = async (req, res) => {
  try {
    let idProduct = req.params.code;
    let nameProduct = (req.body.data.name) ? req.body.data.name : null;
    let descriptionProduct = (req.body.data.descrption) ? req.body.data.descrption : null;
    let availability = (req.body.data.availability) ? req.body.data.availability : null;
    let amountProduct = (req.body.data.amount) ? req.body.data.amount : null;
    let priceProduct = (req.body.data.price) ? req.body.data.price : null;
    

    connectionDB.query("UPDATE product SET ? WHERE id_product = ?", [{
      name_product: nameProduct,
      description_product: descriptionProduct,
      availability_product: 'available',
      amount_poduct: amountProduct,
      price_product: priceProduct
    }, idProduct], (err, rows) => {
      if (!err) {
        return res.status(200).send({
          mensaje: "Producto actualizado con exito",
          rows: rows
        });
      }

      else {
        return res.status(403).send({
          mensaje: "Error al consultar producto",
          error: err
        });
      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    });
  }
};

controllerProduct.deleteProduct = async (req, res) => {
  let idProduct = req.params.code;
  connectionDB.query("DELETE FROM product WHERE id_product = ?", [idProduct], (err, rows) => {
    if (!err) {
      return res.status(200).send({
        mensaje: "Producto eliminado con exito",
        rows: rows
      });
    } else {
      return res.status(403).send({
        mensaje: "Error al eliminar producto",
        error: err
      });
    }
  });
};

export default controllerProduct;