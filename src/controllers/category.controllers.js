import connectionDb from "../config/dataBase/dataBase.js";
import cloudinaryUpload from "../config/cloudinary/uploadImages.js";
import cloudinaryDelete from "../config/cloudinary/deleteImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";

const controllerCategory = {};

controllerCategory.postCategory = async (req, res) => {
  try {
    const nameCategory = (req.body.data.category) ? req.body.data.category : null;
    const routeImage = (req.body.data.image) ? req.body.data.image : null;
    let emailUser = req.user.emailUser;
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
        }
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
    connectionDb.query("SELECT id_store FROM category WHERE email_store = ?", [req.user.emailUser], (err, rows) => {
      if (rows.length > 0) {
        connectionDb.query("SELECT * ")
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

controllerCategory.putCategory = async (req, res) => {
  try {
    let nameCategory = req.body.data.name;
    let imageCategory = req.body.data.image;
    let ruteImage = req.body.data.image;


  } catch (error) {

  }
};


controllerCategory.deleteCategory = (req, res) => {
  try {
    let emailStore = req.user.emailUser;
    console.log(emailStore);
    let nameCategory = req.body.data.name;
    let passwordUser = req.body.data.password;

    let id_store = null;
    connectionDb.query("SELECT password_store, id_store FROM store WHERE email_store = ?", [emailStore], async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          id_store = rows[0].id_store;
          let passwordUserDB = rows[0].password_store;
          let comparePassword = await bcryptjs.matchPassword(passwordUser, passwordUserDB);
          if (comparePassword) {
            connectionDb.query("SELECT * FROM category WHERE name_category = ?", [nameCategory], async (err, rows) => {




            });
          };
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