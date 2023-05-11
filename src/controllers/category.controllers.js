import connectionDb from "../config/dataBase/dataBase.js";
import cloudinaryUpload from "../config/cloudinary/uploadImages.js";
import cloudinaryDelete from "../config/cloudinary/deleteImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";

const controllerCategory = {};

controllerCategory.postCategory = async (req, res) => {
  try {
    const nameCategory = (req.body.data.nameCategory) ? req.body.data.nameCategory : null;
    const routeImage = (req.body.data.image) ? req.body.data.image : null;
    let emailUser = req.user.emailUser;
    console.log(emailUser);
    let photoCategory = null;
    let urlImage = null;
    let idImage = null;

    if (routeImage) {
      const photoCategory = await cloudinaryUpload.uploadImagesCategories(routeImage);
      urlImage = photoCategory.secure_url;
      idImage = photoCategory.public_id;
    }

    // Insertar la nueva categoría en la base de datos
    const idStore = await connectionDb.query("SELECT id_store FROM store WHERE email_store = ?", [emailUser], async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          await connectionDb.query("INSERT INTO category SET ?", {
            name_category: nameCategory,
            img_category: urlImage,
            id_img_category: idImage,
            id_store: rows[0].id_store
          }, (err, rows) => {
            if (!err) {
              return res.status(200).send({
                mensaje: "Categoria insertada con exito."
              });
            }
          });
        } else {
          return res.status(404).send({
            mensaje: "No hay ningun usuario registrado en la base de datos."
          });
        }
      } else {
        return res.status(500).send({
          mensaje: "error",
          err
        })
      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error al registrar categoria.",
      error: error
    });
  }
};

controllerCategory.getCategory = (req, res) => {
  connectionDb.query("SELECT * FROM category", (err, rows) => {
    if (err) {
      return res.status("200").send({
        mensaje: " Error al mostrar categoria",
        error: err
      });
    } else {
      return res.status("200").send({
        mensaje: "Mostrando categoria con exito",
        rows: rows
      });
    };
  });
};

controllerCategory.getCategoryStore = async (req, res) => {
  try {
    connectionDb.query("SELECT id_store FROM store WHERE email_store = ?", [req.user.emailUser], (err, rows) => {
      if (rows.length > 0) {
        connectionDb.query("SELECT * FROM category WHERE id_store = ?", [rows[0].id_store], (err, rows) => {
          if (rows.length > 0) {

            return res.status(200).send({
              mensaje: "Mostrando categorias con exito",
              data: rows
            });
          } else if (err) {
            return res.status(500).send({
              mensaje: "Error al mostrar las categorias"
            });
          }
        })
      } else {
        return res.status(202).send({
          mensaje: "Error al mostrar las categorias"
        });
      }
    })
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
    })
  }
}

controllerCategory.getCategoriesStore = async (req, res) => {
  try {
    let email = req.user.emailUser;
    await connectionDb.query("SELECT id_store  FROM store WHERE email_store = ?", [email], async (err, rows) => {
      if (!err) {
        connectionDb.query("SELECT * FROM category WHERE id_store = ?", [rows[0].id_store], (err, rows) => {
          console.log(rows);
          if (!err) {
            return res.status(200).send({
              mensaje: "Mostrando categorias con exito",
              rows
            })
          } else {
            return res.status(404).send({
              mensaje: "Error al mostrar las categorias"
            });
          }
        })
      } else {
        return res.status(404).send({
          mensaje: "Error al mostrar las categorias"
        });
      }
    })

  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
    })
  }
}

controllerCategory.putCategory = async (req, res) => {
  try {
    let idCategory = (req.body.data.code) ? req.body.data.code : null;
    let nameCategory = (req.body.data.name) ? req.body.data.name : null;
    let ruteImage = (req.body.data.image) ? req.body.data.image : null;
    let uploadImage = (ruteImage != null) ? await cloudinaryUpload.uploadImagesCategories(ruteImage) : null;
    let idImage = (uploadImage != null) ? uploadImage.public_id : null;
    let urlImage = (uploadImage != null) ? uploadImage.secure_url : null;

    await connectionDb.query("SELECT * FROM category WHERE id_category = ?", [idCategory], async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          let nameCategoryDb = (nameCategory != null) ? nameCategory : rows[0].name_category;
          let imageCategoryDb = (urlImage != null) ? urlImage : rows[0].img_category;
          let idImageDb = (idImage != null) ? idImage : rows[0].id_img_category;

          await connectionDb.query("UPDATE category SET name_category = ?, img_category = ?, id_img_category = ? WHERE id_category = ?", [nameCategoryDb, imageCategoryDb, idImageDb, idCategory], (err, rows) => {
            if (!err) {
              return res.status(200).send({
                mensaje: "Categoria actualizada con exito."
              });
            } else {
              return res.status(404).send({
                mensaje: "Error al actualizar la categoria"
              });
            }
          });

        } else {
          return res.status(404).send({
            mensaje: "No existe la categoria"
          })
        }
      } else {
        return res.status(500).send({
          mensaje: "Error al actualizar la categoria",
          err
        })
      }
    })

  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
    })
  }
};


controllerCategory.deleteCategory = (req, res) => {
  try {
    let emailStore = req.user.emailUser;
    let idCategory = req.params.idCategory;
    let passwordUser = req.body.data.password;
    connectionDb.query("SELECT password_store, id_store FROM store WHERE email_store = ?", [emailStore], async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          let id_store = rows[0].id_store;
          let passwordUserDB = rows[0].password_store;
          let comparePassword = await bcryptjs.matchPassword(passwordUser, passwordUserDB);
          if (comparePassword) {
            await connectionDb.query('DELETE FROM category WHERE id_category  = ?', [idCategory], async (err, rows) => {
              if (!err) {
                return res.status(200).send({
                  mensaje: "Categoria eliminada con exito"
                })
              } else {
                return res.status(500).send({
                  mensaje: "Error al eliminar la categoria",
                  err
                })
              }
            })
          } else {
            return res.status(202).send({
              mensaje: "Contraseña incorrecta"
            });
          }
        } else {
          return res.status(202).send({
            mensaje: "Este usuario no existe"
          });
        };
      };
    })

  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor"
    })
  }


  // connectionDb.query("SELECT password_admin FROM administrator WHERE email_admin = ?", [emailAdmin], async (err, rows) => {
  //   if (!err) {
  //     if (rows.length > 0) {
  //       let passwordAdminDB = rows[0].password_admin;
  //       let comparePassword = await bcryptjs.matchPassword(passwordAdmin, passwordAdminDB);
  //       if (comparePassword) {
  //         connectionDb.query("SELECT * FROM category WHERE id_category = ?", [idCategory], async (err, rows) => {
  //           if (err) {
  //             return res.status(500).send({
  //               mensaje: "Error al buscar categoria"
  //             });
  //           } else if (rows.length == 0) {
  //             return res.status(202).send({
  //               mensaje: "Esta categoria no existe"
  //             });
  //           } else if (rows.length > 0) {
  //             let deleteImage = await cloudinaryDelete.deleteImage(rows[0].id_img_category);
  //             connectionDb.query("DELETE FROM category WHERE id_category = ?", [idCategory], async (err, rows) => {
  //               if (err) {
  //                 return res.status(500).send({
  //                   mensaje: "Error al eliminar categoria",
  //                 });
  //               } else {
  //                 return res.status(200).send({
  //                   mensaje: "Categoria eliminada con exito",
  //                   rows: rows
  //                 });
  //               };
  //             });
  //           };
  //         });
  //       };
  //     } else if (rows.length == 0) {
  //       return res.status(202).send({
  //         mensaje: "No se encontro el usuario"
  //       });
  //     };
  //   } else {
  //     return res.status(500).send({
  //       mensaje: "Error al eliminar categoria"
  //     });
  //   };
  // });
};

export default controllerCategory;