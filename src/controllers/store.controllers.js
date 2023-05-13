import connectionDB from "../config/dataBase/dataBase.js";
import uploadImages from "../config/cloudinary/uploadImages.js";
import deleteImages from "../config/cloudinary/deleteImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";
import emailSend from "../config/email/emailCreateUsers.js"
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
                  id_employee: id
                }, async (err, rows) => {
                  if (!err) {
                    let sendEmail = await emailSend.createStore(emailEmployee, nameEmployee, nameStore, emailStore, passwordStore);
                    console.log(sendEmail);
                    return res.status(200).send({
                      mensaje: "Tienda registrada con exito.",
                    })
                  } else {
                    return res.status(202).send({
                      mensaje: "Error al registrar la tienda el empleado ya existe.",
                      error: err
                    })
                  }
                });
              } else {
                return res.status(202).send({
                  mensaje: "Error"
                })
              }
            });
          } else {
            return res.status(202).send({
              mensaje: "Error al registrar la tienda."
            })
          }
        });
      } else {
        return res.status(202).send({
          mensaje: "Error al obtener el administrador"
        })
      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Ocurrio un error",
    })
  }
};

controllerStore.getStore = async (req, res) => {
  try {
    connectionDB.query("SELECT * FROM store", (err, rows) => {
      if (rows.length > 0) {
        return res.status("200").send({
          mensaje: "Tiendas obtenidas",
          error: rows,
        });
      } else if (rows.length === 0) {
        return res.status("202").send({
          mensaje: "No hay locales",
        });
      } else {
        return res.status("202").send({
          mensaje: "Error al mostrar local",
          err: err,
        });
      }
    });
  } catch (error) {
    return res.status("500").send({
      mensaje: "Ocurrio un error",
    });
  }
};

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
            })
          } else {
            return res.status(202).send({
              mensaje: "Error al obtener los locales",
              error: err
            })
          }
        })
      } else {
        return res.status(202).send({
          mensaje: "Error al obtener el administrador"
        })
      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Ocurrio un error",
    })
  }
}

controllerStore.putStore = async (req, res) => {
  let nameStore = null;
  let locationStore = null;
  let phoneStore = null;
  let descriptionStore = null;
  let imageStore = null;
  let urlImage = null;
  let idImage = null;
  let categories = null;
  let idEmployee = req.user.idUser ? req.user.idUser : null;
  let routeImage = req.body.image ? req.body.image : null;
  let passwordEmployee = req.body.password ? req.body.password : null;
  let idStore = req.body.code ? req.body.code : null;

  await connectionDB.query(
    "SELECT password_employee FROM employee WHERE email_employee = ?",
    [idEmployee],
    async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          let passwordEmployeeDB = rows[0].password_employee;
          let comparePassword = await bcryptjs.matchPassword(
            passwordEmployee,
            passwordEmployeeDB
          );
          if (comparePassword) {
            await connectionDB.query(
              "SELECT * FROM store WHERE id_store = ?",
              [idStore],
              async (err, rows) => {
                if (rows.length != 0) {
                  (req.body.name) ? nameStore = req.body.name : nameStore = rows[0].name_store;
                  (req.body.location) ? locationStore = req.body.location : locationStore = rows[0].location_store;
                  (req.body.phone) ? phoneStore = req.body.phone : phoneStore = rows[0].phone_number_store;
                  (req.body.description) ? descriptionStore = req.body.description : descriptionStore = rows[0].description_store;
                  (routeImage != null) ? (imageStore = await uploadImages.uploadImagesStore(routeImage, "Flash/stores/" + rows[0].name_store)) : (imageStore = null);
                  (routeImage != null) ? await deleteImages.deleteImage(rows[0].id_img_store) : null;
                  (imageStore != null) ? urlImage = imageStore.secure_url : urlImage = rows[0].img_store;
                  (imageStore != null) ? idImage = imageStore.public_id : idImage = rows[0].id_img_store;

                  if (req.body.category) {
                    categories = req.body.category;
                    connectionDB.query("SELECT category_store WHERE id_store = ?", [idStore], async (err, rows) => {
                      if (err) {
                        return res.status(202).send({
                          mensaje: "Error al obtener categorias"
                        })
                      } if (rows.length == 0) {
                        await connectionDB.query("INSERT INTO category_store SET ?", {
                          id_store: idStore,
                          id_category: categories
                        }, (err, rows) => {
                          if (err) {
                            return res.status(404).send({
                              mensaje: "Error al insertar categorias"
                            })
                          } else {
                            return res.status(200).send({
                              mensaje: "Categorias insertadas"
                            })
                          }
                        })
                      } else if (rows.length > 0) {
                        for (let x = 0; x < rows.length; x++) {
                          if (rows[x].id_category == categories) {
                            return res.status(202).send({
                              mensaje: "El al local ya se le asigno"
                            })
                          } else {
                            await connectionDB.query("INSERT INTO categoty_store SET ?", {
                              id_category_store: null,
                              id_category: categories,
                              id_store: idStore
                            }, (err, rows) => {
                              if (err) {
                                return res.status(202).send({
                                  mensaje: "Error al insertar categorias"
                                })
                              } else {
                                return res.status(200).send({
                                  mensaje: "Categorias insertadas"
                                })
                              }
                            })
                          }
                        }
                      } else {
                        return res.status(202).send({
                          mensaje: "El local no tiene categorias"
                        })
                      }
                    })
                  }

                  await connectionDB.query(
                    "UPDATE store SET ? WHERE id_store = ?",
                    [{
                      name_store: nameStore,
                      location_store: locationStore,
                      phone_number_store: phoneStore,
                      description_store: descriptionStore,
                      img_store: urlImage,
                      id_img_store: idImage
                    },
                      idStore
                    ],
                    (err, rows) => {
                      if (err) {
                        return res.status(202).send({
                          mensaje: "Error al actualizar local",
                          error: err
                        });
                      } else {
                        return res.status(200).send({
                          mensaje: "Local actualizado",
                          rows: rows
                        });
                      }
                    }
                  );
                } else if (err) {
                  return res.status(202).send({
                    mensaje: "Error",
                    error: err
                  });
                } else if (rows.length == 0) {
                  res.status(202).send({
                    mensaje: "El local no existe"
                  });
                } else {
                  return res.status(202).send({
                    mensaje: "Error al actualizar local",
                    error: err
                  });
                }
              }
            );
          } else {
            return res.status("202").send({
              mensaje: "Contraseña incorrecta"
            });
          }
        } else if (rows.length === 0) {
          return res.status(404).send({
            mensaje: "El usuario no existe",
            rows
          });
        } else if (err) {
          return res.status("202").send({
            mensaje: "Error",
            error: err
          });
        }
      } else {
        return res.status("202").send({
          mensaje: "Error",
          err: err
        });
      }
    }
  );
};

controllerStore.deleteStore = async (req, res) => {
  let idStore = req.body.code ? req.body.datacode : null;
  let idUser = req.user.idUser ? req.user.idUser : null;
  let passwordAdministrator = req.body.password ? req.body.password : null;

  await connectionDB.query(
    "SELECT password_admin FROM administrator WHERE email_admin = ?",
    [idUser],
    async (err, rows) => {
      if (rows.length == 0) {
        return res.status(404).send({
          mensaje: "El usuario no existe",
        });
      } else if (rows.length > 0) {
        let passwordAdminBD = rows[0].password_admin;
        let comparePassword = await bcryptjs.matchPassword(
          passwordAdministrator,
          passwordAdminBD
        );
        if (comparePassword) {
          connectionDB.query(
            "SELECT name_store FROM store WHERE id_store = ?",
            [idStore],
            async (err, rows) => {
              if (rows.length == 0) {
                return res.status(404).send({
                  mensaje: "El local no existe",
                });
              } else if (rows.length > 0) {
                let nameStore = rows[0].name_store;
                await connectionDB.query("DELETE FROM store WHERE id_store = ?", [idStore], async (err, rows) => {
                  if (err) {
                    return res.status("202").send({
                      mensaje: "Error",
                    })
                  } else {
                    await connectionDB.query("DELETE FROM employee WHERE id_store = ?", (err, rows) => {
                      if (err) {
                        return res.status(202).send({
                          mensaje: "Ocurrio un error"
                        })
                      } else {
                        return res.status(200).send({
                          mensaje: "Se borro el empleado"
                        })
                      }
                    })
                  }
                })

              } else if (err) {
                return res.status(202).send({
                  mensaje: "Error al eliminar local",
                  error: err,
                });
              } else {
                return res.status(500).send({
                  mensaje: "Ocurrio un error",
                });
              }
            }
          );
        } else {
          return res.status(404).send({
            mensaje: "Contraseña incorrecta",
          });
        }
      } else if (err) {
        return res.status(404).send({
          mensaje: "Error al eliminar local",
          error: err,
        });
      } else {
        return res.status(404).send({
          mensaje: "Ocurrio un error",
        });
      }
    }
  );
};

export default controllerStore;