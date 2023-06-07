import connectionDB from "../config/dataBase/dataBase.js";
import uploadImages from "../config/cloudinary/uploadImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";
import { query } from "express";

const controllerProduct = {};

controllerProduct.postProduct = async (req, res) => {
  console.log(req.files);
  console.log(req.body);
  console.log("____________________________");
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
      mensaje: "Error al insertar producto",
    })
  }
};

controllerProduct.getProductStore = async (req, res) => {
  
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

};

controllerProduct.getProduct = async (req, res) => {
  try {
    let limit = req.params.limit;
    let code = req.params.code;
    console.log(code);

    if (limit == 0 && code == 0) {
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
    } else if (code != 0) {
      connectionDB.query(`SELECT * FROM product WHERE id_store_product = ${code}`, (err, rows) => {
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
    } else if (limit != 0) {
      connectionDB.query(`SELECT * FROM product limit ${limit}`, (err, rows) => {
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
    }


  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    });
  }
};

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

controllerProduct.getProductOne = async (req, res) => {
  try {
    connectionDB.query("SELECT * FROM product WHERE id_product = ?", [req.params.code], (err, rows) => {
      if (err) {
        return res.status(404).send({
          mensaje: "Error al consultar productos",
          error: err
        });
      } else {
        return res.status("200").send({
          mensaje: "Productos consultados con exito",
          data: rows
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    });
  }
};

controllerProduct.getProductDescount = (req, res) => {
  try {
    connectionDB.query("SELECT * FROM product WHERE dicount > 0", (err, rows) => {
      if (err) {
        return res.status(404).send({
          mensaje: "Error al consultar productos",
          error: err
        });
      } else {
        return res.status("200").send({
          mensaje: "Productos consultados con exito",
          data: rows
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    });
  }
}

controllerProduct.getProductMall = (req, res) => {
  let code = req.params.code;
  let idStore = req.params.idStore

  if (idStore != 0) {
    connectionDB.query("SELECT * FROM product WHERE id_store_product  = ?", [idStore], (err, rows) => {
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
    })
  } else {
    connectionDB.query(`SELECT p.id_product, p.name_product, p.description_product, p.availability_product, p.amount_poduct, p.price_product, p.img_product, p.id_img_product, p.id_store_product, p.id_product_category, p.data_product, p.dicount FROM administrator a JOIN store s ON a.id_admin = s.id_admin JOIN product p ON s.id_store = p.id_store_product WHERE a.id_admin = ${code}`, (err, rows) => {
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
  }
}

controllerProduct.getProductCustomer = (req, res) => {
  let code = req.params.code;
  connectionDB.query("SELECT * FROM product WHERE id_store_product = ?", [code], (err, rows) => {
    if (err) {
      return res.status(404).send({
        mensaje: "Error al consultar productos",
        error: err
      });
    } else {
      return res.status("200").send({
        mensaje: "Productos consultados con exito",
        data: rows
      });
    }
  })
}

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

controllerProduct.getProductCategory = async (req, res) => {
  let category = req.params.code;
  connectionDB.query("SELECT * FROM product WHERE id_product_category = ?", [category], (err, rows) => {
    if (!err) {
      return res.status(200).send({
        mensaje: "Productos consultados con exito",
        rows: rows
      });
    } else {
      return res.status(403).send({
        mensaje: "Error al consultar productos",
        error: err
      });
    }
  })
}

export default controllerProduct;