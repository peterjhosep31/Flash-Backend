"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dataBase = _interopRequireDefault(require("../config/dataBase/dataBase.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var buys = {};
buys.addBuy = function (req, res) {
  // try {
  var bann = false;
  var precio = req.params.price;
  if (req.params.idProduct > 0) {
    var product = req.params.idProduct;
    var emailCustomer = req.user.emailUser;
    var price = req.body.data.price ? req.body.data.price * -1 : null;
    var amountProduct = req.body.data.amount;
    var adressCustomer = req.body.data.adress;
    var phoneCustomer = req.body.data.phone;
    var total = price * amountProduct;
    var idCustomer = req.body.data.id;
    var typeBuy = req.body.data.venta;
    _dataBase["default"].query("SELECT id_store_product, name_product FROM product WHERE id_product = ?", [product], function (err, rows) {
      if (!err && rows.length > 0) {
        var idStore = rows[0].id_store_product;
        var nameProduct = rows[0].name_product;
        _dataBase["default"].query("SELECT email_employee, name_employee FROM employee WHERE id_store = ?", [idStore], function (err, rows) {
          if (!err && rows.length > 0) {
            var emailEmployee = rows[0].email_employee;
            var nameEmployee = rows[0].name_employee;
            _dataBase["default"].query("SELECT name_customer FROM customer WHERE email_customer = ?", [emailCustomer], function (err, rows) {
              if (!err && rows.length > 0) {
                var nameCustomer = rows[0].name_customer;
                _dataBase["default"].query("SELECT name_store FROM store WHERE id_store = ?", [idStore], function (err, rows) {
                  if (!err, rows.length > 0) {
                    var nameStore = rows[0].name_store;
                    _dataBase["default"].query("INSERT INTO buys SET ?", {
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
                      nombre_product: nameProduct,
                      tipo_venta: typeBuy
                    }, function (err, rows) {
                      console.log("entro", err);
                      if (!err) {
                        return res.status(200).send({
                          mensaje: "Compra exitosa",
                          rows: rows
                        });
                      } else {
                        return res.status(404).send({
                          mensaje: "Error al realizar la compra"
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  } else if (precio > 0) {
    var _total = req.params.price;
    var _emailCustomer = req.user.emailUser ? req.user.emailUser : null;
    var _adressCustomer = req.body.data.adress ? req.body.data.adress : null;
    var _phoneCustomer = req.body.data.phone ? req.body.data.phone : null;
    var _idCustomer = req.body.data.id ? req.body.data.id : null;
    var _typeBuy = req.body.data.venta ? req.body.data.venta : null;
    var id = req.user.idUser ? req.user.idUser : null;
    _dataBase["default"].query("SELECT * FROM cardshopping WHERE id_customer = ?", [id], function (err, rows) {
      if (!err && rows.length > 0) {
        var totalRows = rows.length;
        var completedRows = 0;
        var _loop = function _loop() {
          var product = rows[x].id_product;
          var amountProduct = rows[x].amount_Product;
          var discountDB = rows[x].discount;
          var price = discountDB != 0 ? rows[0].price_product * discountDB / 100 : rows[x].price_product;
          _dataBase["default"].query("SELECT id_store_product, name_product FROM product WHERE id_product = ?", [product], function (err, rows) {
            if (!err && rows.length > 0) {
              var idStore = rows[0].id_store_product;
              var nameProduct = rows[0].name_product;
              _dataBase["default"].query("SELECT email_employee, name_employee FROM employee WHERE id_store = ?", [idStore], function (err, rows) {
                if (!err && rows.length > 0) {
                  var emailEmployee = rows[0].email_employee;
                  var nameEmployee = rows[0].name_employee;
                  _dataBase["default"].query("SELECT name_customer FROM customer WHERE email_customer = ?", [_emailCustomer], function (err, rows) {
                    if (!err && rows.length > 0) {
                      var nameCustomer = rows[0].name_customer;
                      _dataBase["default"].query("SELECT name_store FROM store WHERE id_store = ?", [idStore], function (err, rows) {
                        if (!err, rows.length > 0) {
                          var nameStore = rows[0].name_store;
                          _dataBase["default"].query("INSERT INTO buys SET ?", {
                            email_customer: _emailCustomer,
                            id_product: product,
                            id_store: idStore,
                            email_employee: emailEmployee,
                            price_product: price,
                            amount_product: amountProduct,
                            direcion_cliente: _adressCustomer,
                            telefono_cliente: _phoneCustomer,
                            total: _total,
                            nombre_cliente: nameCustomer,
                            id_user: _idCustomer,
                            nombre_tienda: nameStore,
                            nombre_empleado: nameEmployee,
                            nombre_product: nameProduct,
                            tipo_venta: _typeBuy
                          }, function (err, rows) {
                            console.log(err);
                            if (!err) {
                              _dataBase["default"].query("DELETE FROM `cardshopping` WHERE id_customer = ? AND id_product = ?", [id, product], function (err, rows) {
                                if (!err) {
                                  completedRows++;
                                  if (completedRows === totalRows) {
                                    bann = true;
                                    sendResponse();
                                  }
                                }
                              });
                            } else {
                              console.log("no se borro del carrito");
                              sendResponse();
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        };
        for (var x = 0; x < rows.length; x++) {
          _loop();
        }
      }
    });
  } else if (precio == 0 && req.params.idProduct == 0) {
    _dataBase["default"].query("SELECT email_employee FROM employee WHERE id_store = ?", [req.body.data.store], function (err, rows) {
      console.log("entro", err);
      console.log(rows);
      if (rows.length > 0 && !err) {
        var emailEmployee = rows[0].email_employee;
        _dataBase["default"].query("SELECT name_store FROM store WHERE id_store = ?", [req.body.data.store], function (err, rows) {
          console.log("entro", err);
          if (!err, rows.length > 0) {
            var nameStore = rows[0].name_store;
            _dataBase["default"].query("INSERT INTO buys SET ?", {
              email_customer: req.body.data.dataemailCustomer,
              id_product: req.body.data.idProduct,
              id_store: req.body.data.store,
              email_employee: emailEmployee,
              price_product: req.body.data.price,
              amount_product: req.body.data.quantity,
              direcion_cliente: req.body.data.adress,
              telefono_cliente: req.body.data.phone,
              total: req.body.data.total,
              nombre_cliente: 'anonimo',
              id_user: 1,
              nombre_tienda: req.body.data.nameStore,
              nombre_empleado: req.body.data.employee,
              nombre_product: req.body.data.product,
              tipo_venta: req.body.data.venta
            }, function (err, rows) {
              if (!err) {
                return res.status(200).send({
                  mensaje: "Compra exitosa",
                  rows: rows
                });
              } else {
                return res.status(404).send({
                  mensaje: "Error al realizar la compra",
                  err: err
                });
              }
            });
          }
        });
      } else {
        return res.status(404).send({
          mensaje: "Error al realizar la compra"
        });
      }
    });
  }
  function sendResponse() {
    if (bann) {
      console.log('compra');
      return res.status(200).send({
        mensaje: "Compra exitosa"
      });
    } else {
      console.log('no compra');
      return res.status(404).send({
        mensaje: "Error al realizar la compra"
      });
    }
  }

  // } catch (error) {
  //   return res.status(500).send({
  //     mensaje: "Error al realizar la compra",
  //     error
  //   })
  // }
};

buys.getBuys = function (req, res) {
  var emailCustomer = req.user.emailUser;
  _dataBase["default"].query("SELECT * FROM buys WHERE email_customer = ?", [emailCustomer], function (err, rows) {
    if (!err) {
      return res.status(200).send({
        mensaje: "Mostrando compras con exito",
        rows: rows
      });
    } else {
      return res.status(404).send({
        mensaje: "Error al mostrar las compras"
      });
    }
  });
};
buys.getStoreGrafic = function (req, res) {
  _dataBase["default"].query("SELECT * FROM buys", function (err, rows) {
    if (!err) {
      return res.status(200).send({
        mensaje: "Mostrando tus tiendas con exito!",
        rows: rows
      });
    } else {
      return res.status(404).send({
        mensaje: "Error en consultar tus tiendas"
      });
    }
  });
};
buys.getBuysStore = function (req, res) {
  var emailStore = req.user.emailUser;
  _dataBase["default"].query("SELECT id_store FROM store WHERE email_store = ?", [emailStore], function (err, rows) {
    if (!err) {
      var idStore = rows[0].id_store;
      _dataBase["default"].query("SELECT * FROM buys WHERE id_store = ?", [idStore], function (err, rows) {
        if (!err) {
          return res.status(200).send({
            mensaje: "Mostrando compras con exito",
            rows: rows
          });
        } else {
          return res.status(404).send({
            mensaje: "Error al mostrar las compras"
          });
        }
      });
    }
  });
};
var _default = buys;
exports["default"] = _default;