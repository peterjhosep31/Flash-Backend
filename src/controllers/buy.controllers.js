import connectionDB from "../config/dataBase/dataBase.js";

const buys = {};

buys.addBuy = (req, res) => {
  try {
    let precio = req.params.price
    if (req.params.idProduct != 0) {
      let emailCustomer = req.user.emailUser;
      let price = (req.body.data.price) ? req.body.data.price * -1 : null;
      let amountProduct = req.body.data.amount;
      let adressCustomer = req.body.data.adress;
      let phoneCustomer = req.body.data.phone;
      let total = price * amountProduct;
      let idCustomer = req.body.data.id;

      connectionDB.query("SELECT id_store_product, name_product FROM product WHERE id_product = ?", [product], (err, rows) => {
        if (!err && rows.length > 0) {
          let idStore = rows[0].id_store_product;
          let nameProduct = rows[0].name_product;
          connectionDB.query("SELECT email_employee, name_employee FROM employee WHERE id_store = ?", [idStore], (err, rows) => {
            if (!err && rows.length > 0) {
              let emailEmployee = rows[0].email_employee;
              let nameEmployee = rows[0].name_employee;
              connectionDB.query("SELECT name_customer FROM customer WHERE email_customer = ?", [emailCustomer], (err, rows) => {
                if (!err && rows.length > 0) {
                  let nameCustomer = rows[0].name_customer
                  connectionDB.query("SELECT name_store FROM store WHERE id_store = ?", [idStore], (err, rows) => {
                    if (!err, rows.length > 0) {
                      let nameStore = rows[0].name_store;
                      connectionDB.query("INSERT INTO buys SET ?", {
                        email_customer: emailCustomer,
                        id_product: product,
                        id_store: idStore,
                        email_employee: emailEmployee,
                        price_product: price,
                        amount_product: amountProduct,
                        direcion_cliente: adressCustomer,
                        telefono_cliente: phoneCustomer,
                        total: total,
                        nombre_cliente: nameCustomer,
                        id_user: idCustomer,
                        nombre_tienda: nameStore,
                        nombre_empleado: nameEmployee,
                        nombre_product: nameProduct
                      }, (err, rows) => {
                        if (!err) {
                          return res.status(200).send({
                            mensaje: "Compra exitosa",
                            rows
                          })
                        } else {
                          return res.status(404).send({
                            mensaje: "Error al realizar la compra"
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    } else if (precio > 0) {
      let bann = false;
      let total = req.params.price;
      let emailCustomer = req.user.emailUser;
      let adressCustomer = req.body.data.adress;
      let phoneCustomer = req.body.data.phone;
      let idCustomer = req.body.data.id;
      let id = req.user.idUser;

      connectionDB.query("SELECT * FROM cardshopping WHERE id_customer = ?", [id], (err, rows) => {
        if (!err && rows.length > 0) {
          let totalRows = rows.length;
          let completedRows = 0;

          for (let x = 0; x < rows.length; x++) {
            let product = rows[x].id_product;
            let amountProduct = rows[x].amount_Product;
            let discountDB = rows[x].discount;
            let price = (discountDB != 0) ? (rows[0].price_product * discountDB) / 100 : rows[x].price_product;

            connectionDB.query("SELECT id_store_product, name_product FROM product WHERE id_product = ?", [product], (err, rows) => {
              if (!err && rows.length > 0) {
                let idStore = rows[0].id_store_product;
                let nameProduct = rows[0].name_product;
                connectionDB.query("SELECT email_employee, name_employee FROM employee WHERE id_store = ?", [idStore], (err, rows) => {
                  if (!err && rows.length > 0) {
                    let emailEmployee = rows[0].email_employee;
                    let nameEmployee = rows[0].name_employee;
                    connectionDB.query("SELECT name_customer FROM customer WHERE email_customer = ?", [emailCustomer], (err, rows) => {
                      if (!err && rows.length > 0) {
                        let nameCustomer = rows[0].name_customer
                        connectionDB.query("SELECT name_store FROM store WHERE id_store = ?", [idStore], (err, rows) => {
                          if (!err, rows.length > 0) {
                            let nameStore = rows[0].name_store;
                            connectionDB.query("INSERT INTO buys SET ?", {
                              email_customer: emailCustomer,
                              id_product: product,
                              id_store: idStore,
                              email_employee: emailEmployee,
                              price_product: price,
                              amount_product: amountProduct,
                              direcion_cliente: adressCustomer,
                              telefono_cliente: phoneCustomer,
                              total: total,
                              nombre_cliente: nameCustomer,
                              id_user: idCustomer,
                              nombre_tienda: nameStore,
                              nombre_empleado: nameEmployee,
                              nombre_product: nameProduct
                            }, (err, rows) => {
                              if (!err) {
                                connectionDB.query("DELETE FROM `cardshopping` WHERE id_customer = ? AND id_product = ?", [id, product], (err, rows) => {
                                  if (!err) {
                                    completedRows++;
                                    if (completedRows === totalRows) {
                                      bann = true;
                                      sendResponse();
                                    }
                                  }
                                })
                              } else {
                                console.log("no se borro del carrito");
                                sendResponse();
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        }
      })

      function sendResponse() {
        if (bann) {
          console.log('compra');
          return res.status(200).send({
            mensaje: "Compra exitosa",
          });
        }
      }
    }

  } catch (error) {
    return res.status(500).send({
      mensaje: "Error al realizar la compra"
    })
  }
}

buys.getBuys = (req, res) => {
  let emailCustomer = req.user.emailUser;
  connectionDB.query("SELECT * FROM buys WHERE email_customer = ?", [emailCustomer], (err, rows) => {
    if (!err) {
      return res.status(200).send({
        mensaje: "Mostrando compras con exito",
        rows
      })
    } else {
      return res.status(404).send({
        mensaje: "Error al mostrar las compras"
      })
    }
  })
}

buys.getBuysStore = (req, res) => {
  let emailStore = req.user.emailUser;
  connectionDB.query("SELECT id_store FROM store WHERE email_store = ?", [emailStore], (err, rows) => {
    if (!err) {
      let idStore = rows[0].id_store;
      connectionDB.query("SELECT * FROM buys WHERE id_store = ?", [idStore], (err, rows) => {
        if (!err) {

          return res.status(200).send({
            mensaje: "Mostrando compras con exito",
            rows
          })
        } else {
          return res.status(404).send({
            mensaje: "Error al mostrar las compras"
          })
        }
      })
    }
  })
}

export default buys;