import connectionDB from "../config/dataBase/dataBase.js";

const card = {};

card.postShopping = async (req, res) => {
  let codeProduct = req.params.idProduct;
  let idUser = req.user.idUser;
  let codeStore = req.body.data.code;
  let priceProduct = req.body.data.price;
  let amountProduct = req.bady.data.amount;

  connectionDB.query("INSERT INTO cardshopping SET ?", {
    id_product: codeProduct,
    price_product: priceProduct,
    amount_Product: amountProduct,
    id_customer: idUser,
    id_store : codeStore
  }, (err, rows) => {
    if (!err){
      res.status(200).send({
        message: "Producto agregado al carrito"
      })
    } else {
      res.status(500).send({
        message: "Error al agregar el producto al carrito"
      })
    }
  })
}

card.getShopping = async (req, res) => {
  let idUser = req.user.idUser;

  connectionDB.query("SELECT * FROM cardshopping WHERE id_customer = ?", [idUser], (err, rows) => {
    if (!err){
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

card.deleteShopping = async (req, res) => {
  let codeProduct = req.params.idProduct;
  let idUser = req.user.idUser;
  let codeStore = req.body.data.code;
  connectionDB.query("DELETE FROM cardshopping WHERE id_product = ? AND id_customer = ? AND id_store = ?", [codeProduct, idUser, codeStore], (err, rows) => {
    if (!err){
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
  let codeProduct = req.params.idProduct;
  let idUser = req.user.idUser;
  let codeStore = req.body.data.code;
  let amountProduct = req.bady.data.amount;
  connectionDB.query("UPDATE cardshopping SET amount_Product = ? WHERE id_product = ? AND id_customer = ? AND id_store = ?", [amountProduct, codeProduct, idUser, codeStore], (err, rows) => {
    if (!err){
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