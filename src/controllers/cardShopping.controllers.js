import connectionDB from "../config/dataBase/dataBase.js";

const card = {};

card.postShopping = async (req, res) => {
  let codeProduct = req.body.data.idProduct;
  let name = req.body.data.nameProduct;
  let idUser = req.user.emailUser;
  let codeStore = req.body.data.code;
  let priceProduct = req.body.data.price;
  let amountProduct = req.body.data.amount;
  let discount = req.body.data.discount;

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
        img_producto: req.body.data.img,
        description_product: req.body.data.description,
        discount
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
          return res.status(500).send({
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
  if (!idUser) {
    return res.status(500).send({
      message: "Error al obtener el id del usuario"
    })
  }
  connectionDB.query("SELECT id_customer FROM customer WHERE id_customer = ?", [req.user.idUser], (err, rows) => {
    if (!err && rows.length > 0) {
      connectionDB.query("SELECT * FROM cardshopping WHERE id_customer = ?", [rows[0].id_customer], (err, rows) => {
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
  let codeProduct = req.params.idProduct;
  let idUser = req.user.idUser;
  let codeStore = req.body.data.code;

  if (req.body.data.type == "add") {
    connectionDB.query(`UPDATE cardshopping SET amount_Product = amount_product + ${req.body.data.amount} WHERE id_product = ? AND id_customer = ? AND id_store = ?`, [codeProduct, idUser, req.body.data.code], (err, rows) => {
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
  } else {
    connectionDB.query(`UPDATE cardshopping SET amount_Product = amount_product - ${req.body.data.amount} WHERE id_product = ? AND id_customer = ? AND id_store = ?`, [codeProduct, idUser, req.body.data.code], (err, rows) => {
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

}

card.cardDeleteAll = async (req, res) => {
  try {
    const idUser = req.user.idUser;
    const emailCustomer = req.user.emailUser;

    const result = await connectionDB.promise().query("SELECT * FROM cardshopping WHERE id_customer = ?", [idUser]);
    const rows = result[0];

    let stores = [];
    let price = 0;
    let productBuy = [];

    for (let x = 0; x < rows.length; x++) {
      const producto = rows[x];
      const precioTotal = producto.price_product * producto.amount_Product;

      if (producto.discount > 0) {
        const descuento = (precioTotal * producto.discount) / 100;
        price += precioTotal - descuento;
      } else {
        price += precioTotal;
      }

      const storeResult = await connectionDB.promise().query("SELECT * FROM store WHERE id_store = ?", [rows[x].id_store]);
      const storeRows = storeResult[0];

      if (storeRows.length > 0 && !stores.includes(storeRows[0].name_store)) {
        stores.push(storeRows[0].name_store);
      }

      productBuy.push(producto.name_product);
    }

    const insertResult = await connectionDB.promise().query("INSERT INTO buysPasarela SET ?", {
      id_customer: idUser,
      price: price,
      stores: stores.join(', '),
      producto: productBuy.join(', ')
    });

    const insertId = insertResult[0].insertId;

    res.status(200).send({
      message: "Compra realizada con éxito",
      data: { id: insertId }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Error al procesar la compra"
    });
  }
};


export default card;