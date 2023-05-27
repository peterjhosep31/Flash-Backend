
import connectionDB from "../config/dataBase/dataBase.js";

const card = {};

card.postShopping = async (req, res) => {
  console.log(req.body);
  let codeProduct = req.body.data.idProduct;
  let name = req.body.data.nameProduct;
  let idUser = req.user.emailUser;
  console.log(idUser);
  let codeStore = req.body.data.code;
  console.log(req.body);
  let priceProduct = req.body.data.price;
  let amountProduct = req.body.data.amount;

  connectionDB.query("SELECT id_customer FROM customer WHERE email_customer = ?", [idUser], (err, rows) => {
    let id = rows[0].id_customer
    if (!err) {
      connectionDB.query("INSERT INTO cardshopping SET ?", {
        id_product: codeProduct,
        price_product: priceProduct,
        amount_Product: amountProduct,
        id_customer: id,
        id_store: codeStore,
        name_product: name,
        img_producto:req.body.data.img,
        description_product: req.body.data.description
      }, (err, rows) => {
        if (!err) {
          connectionDB.query("SELECT * FROM cardshopping WHERE id_customer = ?", [id], (err, rows) => {
            if (!err) {
              res.status(200).send({
                message: "Productos encontrados",
                data: rows
              })
            } else {
              res.status(500).send({
                message: "Error al obtener los productos"
              })
            }
          })
        } else {
          console.log(err);
          res.status(500).send({
            message: "Error al agregar el producto al carrito"
          })
        }
      })
    } else {
      res.status(500).send({
        message: "Error al obtener el id del usuario"
      })
    }
  })
}

card.getShopping = async (req, res) => {
  let idUser = req.user.idUser;
  console.log('l--lll-llll-lll',req.user);
  connectionDB.query("SELECT id_customer FROM customer WHERE email_customer = ?", [req.user.emailUser], (err, rows) => {
   
    
    if (!err) {
      connectionDB.query("SELECT * FROM cardshopping WHERE id_customer = ?", [rows[0].id_customer], (err, rows) => {
        console.log(rows);
        if (!err) {
          res.status(200).send({
            message: "Productos encontrados",
            data: rows
          })
        } else {
          res.status(500).send({
            message: "Error al obtener los productos"
          })
        }
      })
    }
  })
}


card.deleteShopping = async (req, res) => {
  let codeProduct = req.params.idProduct;
  let idUser = req.user.idUser;
  connectionDB.query("DELETE FROM cardshopping WHERE id_product = ? AND id_customer = ?", [codeProduct, idUser], (err, rows) => {
    if (!err) {
      res.status(200).send({
        message: "Producto eliminado del carrito"
      })
    } else {
      res.status(500).send({
        message: "Error al eliminar el producto del carrito"
      })
    }
  })
}

card.updateShopping = async (req, res) => {
  console.log(req.body.data.code)
  let codeProduct = req.params.idProduct;
  let idUser = req.user.idUser;
  let codeStore = req.body.data.code;

  connectionDB.query(`UPDATE cardshopping SET amount_Product = amount_product + ${req.body.data.amount} WHERE id_product = ? AND id_customer = ? AND id_store = ?`, [ codeProduct, idUser, req.body.data.code], (err, rows) => {
    if (!err) {
      res.status(200).send({
        message: "Producto actualizado del carrito"
      })
    } else {
      res.status(500).send({
        message: "Error al actualizar el producto del carrito"
      })
    }
  })
}


export default card;