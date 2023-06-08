import uploadImages from "../config/cloudinary/uploadImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";
import emailSend from "../config/email/emailCreateUsers.js";
import connectionDB from "../config/dataBase/dataBase.js";
import password from "../helper/password.js";

const controllerStore = {};

controllerStore.postStore = async (req, res) => {
  try {
    let id = (req.body.data.idEmploado) ? req.body.data.idEmploado : null;
    let nameEmployee = (req.body.data.nombreEmpleado) ? req.body.data.nombreEmpleado : null;
    let emailEmployee = (req.body.data.email) ? req.body.data.email : null;

    let nameStore = (req.body.data.nameStore) ? req.body.data.nameStore : null;
    let location = (req.body.data.ubicacion) ? req.body.data.ubicacion : null;
    let passwordStore = password.cretaePassword();
    let passwordHast = await bcryptjs.encryptPassword(passwordStore);
    let emailStore = nameStore.replace(/\s+/g, '_') + '_' + location.replace(/\s+/g, '_') + '@flash.com';
    let emailAdmin = req.user.emailUser;
    connectionDB.query("SELECT id_admin FROM administrator WHERE email_admin = ?", [emailAdmin], (err, rows) => {
      if (!err && rows.length > 0) {
        let idAdmin = rows[0].id_admin;
        connectionDB.query("INSERT INTO store SET ? ", {
          name_store: nameStore,
          location_store: location,
          email_store: emailStore,
          password_store: passwordHast,
          rol: 'empleado',
          id_admin: idAdmin
        }, async (err, rows) => {
          if (!err) {
            connectionDB.query("SELECT id_store FROM store WHERE email_store = ?", [emailStore], (err, rows) => {
              if (!err && rows.length > 0) {
                let idStore = rows[0].id_store;
                connectionDB.query("INSERT INTO employee SET ?", {
                  name_employee: nameEmployee,
                  email_employee: emailEmployee,
                  state_employee: 'asset',
                  id_store: idStore,
                }, async (err, rows) => {
                  if (!err) {
                    let sendEmail = await emailSend.createStore(emailEmployee, nameEmployee, nameStore, emailStore, passwordStore);
                    return res.status(200).send({
                      mensaje: "Tienda registrada con exito."
                    });
                  } else {
                    return res.status(202).send({
                      mensaje: "Error al registrar la tienda el empleado ya existe.",
                      error: err
                    });
                  }
                });
              } else {
                return res.status(202).send({
                  mensaje: "Error"
                });
              }
            });
          } else {
            return res.status(202).send({
              mensaje: "Error al registrar la tienda."
            });
          }
        });
      } else {
        return res.status(202).send({
          mensaje: "Error al obtener el administrador"
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Ocurrio un error"
    });
  }
};

controllerStore.getStore = async (req, res) => {
  let code = req.params.code;
  let idStore = req.params.idStore;
  if (idStore == 0) {
    connectionDB.query("SELECT * FROM store where id_admin = ? limit 10 ", [code], (err, rows) => {
      if (rows) {
        return res.status("200").send({
          mensaje: "Tiendas obtenidas",
          data: rows
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al mostrar local",
          err: err
        });
      }
    });
  } else {
    connectionDB.query("SELECT * FROM store where id_admin = ? ", [code], (err, rows) => {
      if (rows) {
        let data = rows;
        connectionDB.query("SELECT * FROM product WHERE id_store = ?", [idStore], (err, rows) => {
          if (rows) {
            return res.status("200").send({
              mensaje: "Tiendas obtenidas",
              data: data,
              product: rows
            });
          } else {
            return res.status("202").send({
              mensaje: "Error al mostrar local",
              err: err
            });
          }

        })


      } else {
        return res.status("202").send({
          mensaje: "Error al mostrar local",
          err: err
        });
      }
    });
  }

};

controllerStore.getStores = async (req, res) => {
  let limit = req.params.limit;
  if (limit == 0) {
    connectionDB.query("SELECT * FROM store", (err, rows) => {
      if (rows) {
        return res.status("200").send({
          mensaje: "Tiendas obtenidas",
          data: rows
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al mostrar local",
          err: err
        });
      }
    });
  } else {
    connectionDB.query(`SELECT * FROM store limit ${limit}`, (err, rows) => {
      if (rows) {
        return res.status("200").send({
          mensaje: "Tiendas obtenidas",
          data: rows
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al mostrar local",
          err: err
        });
      }
    });
  }

}

controllerStore.getDataStore = async (req, res) => {
  connectionDB.query("SELECT * FROM store WHERE email_store = ?", [req.user.emailUser], (err, rows) => {
    if (rows.length > 0) {
      return res.status("200").send({
        mensaje: "Tiendas obtenidas",
        data: rows
      });
    } else {
      return res.status("202").send({
        mensaje: "Error al mostrar local",
        err: err
      });
    }
  });
}

controllerStore.getStoreAdmin = async (req, res) => {
  try {
    let email = (req.user.emailUser) ? req.user.emailUser : null;
    connectionDB.query("SELECT id_admin FROM administrator WHERE email_admin = ?", [email], (err, rows) => {
      if (!err && rows.length > 0) {
        let id = rows[0].id_admin;
        connectionDB.query("SELECT e.name_employee, e.email_employee, e.state_employee , s.name_store, s.id_store, s.location_store, s.email_store FROM employee e INNER JOIN store s ON e.id_store = s.id_store WHERE e.id_store IN (SELECT id_store FROM store WHERE id_admin = ?)", [id], (err, rows) => {
          if (!err && rows.length > 0) {
            return res.status(200).send({
              mensaje: "Locales obtenidos",
              data: rows
            });
          } else {
            return res.status(202).send({
              mensaje: "Error al obtener los locales",
              error: err
            });
          }
        });
      } else {
        return res.status(202).send({
          mensaje: "Error al obtener el administrador"
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Ocurrio un error"
    });
  }
};

controllerStore.putStore = async (req, res) => {

  let emailStore = req.user.emailUser;
  let nameStore = (req.body['data[name]']) ? req.body['data[name]'] : null;
  let phone = (req.body['data[phone]']) ? req.body['data[phone]'] : null;
  let description = (req.body['data[description]']) ? req.body['data[description]'] : null;
  let image = null;
  if (req.files != null) {
    image = (req.files.data.tempFilePath) ? req.files.data.tempFilePath : null;
  }
  let photo = (image != null) ? await uploadImages.uploadImagesStore(image, nameStore) : null;
  let urlPhoto = (photo != null) ? photo.secure_url : null;
  let idPhoto = (photo != null) ? photo.public_id : null;

  connectionDB.query("SELECT * FROM store WHERE email_store = ?", [emailStore], (err, rows) => {
    if (!err && rows.length > 0) {
      let nameDB = (nameStore != null) ? nameStore : rows[0].name_store;
      let phoneDB = (phone != null) ? phone : rows[0].phone_number_store;
      let descriptionDB = (description != null) ? description : rows[0].description_store;
      let imageDB = (urlPhoto != null) ? urlPhoto : rows[0].img_store;
      let idPhotoDB = (idPhoto != null) ? idPhoto : rows[0].id_img_store;
      connectionDB.query("UPDATE store SET name_store = ?, phone_number_store = ?, description_store = ?, img_store = ?, id_img_store = ? WHERE email_store = ?", [nameDB, phoneDB, descriptionDB, imageDB, idPhotoDB, emailStore], (err, rows) => {
        if (!err && rows.affectedRows) {
          return res.status(200).send({
            mensaje: "Local actualizado con exito",
            rows
          });
        } else {
          return res.status(202).send({
            mensaje: "Error al actualizar el local",
            error: err
          });
        }
      });
    }
  });
};

controllerStore.deleteStore = async (req, res) => {
  try {
    let code = req.params.code ? req.params.code : null;
    connectionDB.query("SELECT email_employee FROM employee WHERE id_store = ?", [code], (err, rows) => {
      if (rows.length > 0) {
        let email = rows[0].email_employee;
        connectionDB.query("DELETE FROM employee WHERE email_employee = ?", [email], (err, rows) => {
          if (!err) {
            connectionDB.query("DELETE FROM store WHERE id_store = ?", [code], (err, rows) => {
              if (!err) {
                return res.status(200).send({
                  mensaje: "Local eliminado junto con el empleado."
                });
              } else {
                return res.status(500).send({
                  mensaje: "Ocurrio unor",
                  err
                });
              }
            });
          } else {
            return res.status(500).send({
              mensaje: "Ocurri",
              err
            })
          }
        });
      } else {
        return res.status(403).send({
          mensaje: "No se puede eliminar el local porque tiene empleados"
        });
      }
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Ocurrio un error"
    });
  }
};

controllerStore.getPedidos = async (req, res) => {
  let code = req.params.x;
  if (code == 0) {
  connectionDB.query("SELECT DISTINCT date_buys, id_product, amount_product, nombre_cliente, nombre_product, total, direcion_cliente, price_product, id_buys, check_buy FROM `buys` WHERE id_store = ?", [req.params.code], (err, rows) => {
    if (!err) {
      return res.status(200).send({
        mensaje: "Pedidos obtenidos",
        data: rows
      });
    } else {
      return res.status(202).send({
        mensaje: "Error al obtener los pedidos",
        error: err
      });
    }
  })
  } else {
    console.log("Rntro a la cantidad");
    connectionDB.query("SELECT COUNT(*) AS count_check_buy_1 FROM `buys` WHERE id_store = ? AND check_buy = 0", [req.params.code], (err, rows) => {
      if (!err) {
        return res.status(200).send({
          mensaje: "Pedidos obtenidos",
          data: rows
        });
      } else {
        return res.status(202).send({
          mensaje: "Error al obtener los pedidos",
          error: err
        });
      }
    })
  }
}

controllerStore.updateChech = (req, res) => {
  let idBuy = req.params.code; 
  connectionDB.query("UPDATE `buys` SET `check_buy` = '1' WHERE `buys`.`id_buys` = ?", [idBuy], (err, rows) => {
    if (!err) {
      return res.status(200).send({
        mensaje: "Se actualizo"
      })
    } else{
      return res.status(404).send({
        mensaje: "no se actualizo"
      })
    }
  })
}

export default controllerStore