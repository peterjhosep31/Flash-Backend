import connectionDB from "../config/dataBase/dataBase.js";
import uploadImages from "../config/cloudinary/uploadImages.js";
import deleteImages from "../config/cloudinary/deleteImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";

const controllerStore = {};

controllerStore.postStore = async (req, res) => {
  let nameStore = null;
  let locationStore = null;
  let phoneStore = null;
  let descriptionStore = null;
  let routeImage = null;
  let imageStore = null;
  let crateFolder = null;
  let urlImage = null;
  let idImage = null;

  let codeStore = req.body.code ? req.body.code : null;
  let idAdmin = req.user.idUser ? req.user.idUser : null;
  let passwordAdmin = req.body.password ? req.body.password : null;

  await connectionDB.query(
    "SELECT password_admin FROM administrator WHERE id_admin = ?",
    [idAdmin],
    async (err, rows) => {
      if (err) {
        return res.status(202).send({
          mensaje: "No se encontro el usuario",
          error: err,
        });
      } else if (rows.length > 0) {
        let passwordAdminDB = rows[0].password_admin;
        let comparePassword = await bcryptjs.matchPassword(
          passwordAdmin,
          passwordAdminDB
        );

        if (comparePassword) {
          await connectionDB.query(
            "SELECT * FROM store WHERE id_store = ?",
            [codeStore],
            async (err, rows) => {
              if (!err) {
                if (rows.length > 0) {
                  return res.status("202").send({
                    mensaje: "La tienda ya existe",
                    storeName: rows[0].name_store,
                  });
                } else if (rows.length === 0) {
                  nameStore = req.body.name ? req.body.name : null;
                  crateFolder =
                    nameStore != null ?
                      await uploadImages.createFolder(nameStore) :
                      null;
                  locationStore = req.body.location ? req.body.location : null;
                  phoneStore = req.body.phone ? req.body.phone : null;
                  descriptionStore = req.body.description ?
                    req.body.description :
                    null;
                  routeImage = req.body.image ? req.body.image : null;
                  imageStore =
                    routeImage != null ?
                      await uploadImages.uploadImagesStore(
                        routeImage,
                        crateFolder.path
                      ) :
                      null;
                  urlImage = imageStore != null ? imageStore.secure_url : null;
                  idImage = imageStore != null ? imageStore.public_id : null;

                  connectionDB.query(
                    "INSERT INTO store SET ?", {
                    id_store: codeStore,
                    name_store: nameStore,
                    location_store: locationStore,
                    phone_number_store: phoneStore,
                    description_store: descriptionStore,
                    img_store: urlImage,
                    id_img_store: idImage,
                  },
                    (err, rows) => {
                      if (!err) {
                        return res.status("200").send({
                          mensaje: "Tienda creada",
                        });
                      } else if (err.code == "ER_DUP_ENTRY") {
                        return res.status("202").send({
                          mensaje: "El codigo de la tienda ya existe",
                        });
                      } else if (err) {
                        return res.status("201").send({
                          mensaje: "Error al crear la tienda",
                          err,
                        });
                      } else {
                        return res.status("200").send({
                          mensaje: "Error",
                        });
                      }
                    }
                  );
                } else {
                  return res.status(202).send({
                    mensaje: "Ocurrio un error",
                  });
                }
              }
            }
          );
        } else {
          return res.status(202).send({
            mensaje: "Contraseña incorrecta",
          });
        }
      } else if (rows.length === 0) {
        return res.status(202).send({
          mensaje: "El usuario no exite",
        });
      }
    }
  );
};

controllerStore.getStore = async (req, res) => {
  await connectionDB.query("SELECT * FROM store", (err, rows) => {
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
};

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
    "SELECT password_employee FROM employee WHERE id_employee = ?",
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
          return res.status("202").send({
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
  let idStore = req.body.code ? req.body.code : null;
  let idUser = req.user.idUser ? req.user.idUser : null;
  let passwordAdministrator = req.body.password ? req.body.password : null;

  await connectionDB.query(
    "SELECT password_admin FROM administrator WHERE id_admin = ?",
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