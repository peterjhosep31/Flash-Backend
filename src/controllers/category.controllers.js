import connectionDb from "../config/dataBase/dataBase.js";
import cloudinaryUpload from "../config/cloudinary/uploadImages.js";
import cloudinaryDelete from "../config/cloudinary/deleteImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";

const controllerCategory = {};

controllerCategory.postCategory = async (req, res) => {
  let nameCategory = (req.body.category) ? req.body.category : null;
  let routeImage = (req.body.image) ? req.body.image : null;
  let passwordAdmin = (req.body.password) ? req.body.password : null;
  let emailAdmin = req.user.emailUser;
  let photoCategory = null;
  let urlImage = null;
  let idImage = null;

  await connectionDb.query("SELECT password_admin FROM administrator WHERE email_admin = ?", [emailAdmin], async (err, rows) => {
    if (!err) {
      if (rows.length > 0) {
        let passwordAdminDB = rows[0].password_admin;
        let comparePassword = await bcryptjs.matchPassword(passwordAdmin, passwordAdminDB);
        if (comparePassword) {
          await connectionDb.query("SELECT * FROM category WHERE name_category = ?", [nameCategory], async (err, rows) => {
            if (err) {
              return res.status(202).send({
                mensaje: "Error al buscar categoria"
              });
            } else if (rows.length === 0) {
              photoCategory = (routeImage) ? await cloudinaryUpload.uploadImagesCategories(routeImage) : null;
              urlImage = (photoCategory) ? photoCategory.secure_url : null;
              idImage = (photoCategory) ? photoCategory.public_id : null;

              await connectionDb.query("INSERT INTO category SET ?", {
                name_category: nameCategory,
                img_category: urlImage,
                id_img_category: idImage
              }, (err, rows) => {
                if (err) {
                  return res.status(202).send({
                    mensaje: "Error al insertar categoria",
                    error: err
                  });
                } else {
                  return res.status(200).send({
                    mensaje: "Categoria insertada con exito",
                    rows: rows
                  });
                };
              });
            } else if (rows.length > 0) {
              return res.status(202).send({
                mensaje: "Esta categoria ya existe"
              })
            } else {
              return res.status(500).send({
                mensaje: "Error"
              });
            };
          });
        } else {
          return res.status("202").send({
            mensaje: "Contraseña incorrecta"
          });
        };
      } else {
        return res.status("202").send({
          mensaje: "Error al registrar categoria",
          error: err
        });
      };
    } else {
      return res.status("202").send({
        mensaje: "Error al registrar categoria",
        error: err
      });
    };
  });
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

controllerCategory.putCategory = (req, res) => {
  let idCategory = (req.body.codeCategory) ? req.body.codeCategory : null;
  let passwordAdmin = (req.body.password) ? req.body.password : null;
  let routeImage = (req.body.image) ? req.body.image : null;
  let emailAdmin = req.user.emailUser;
  let photoCategory = null;
  let urlImage = null;
  let idImage = null;
  let nameCategory = null;
  let deleteImage = null;

  connectionDb.query("SELECT password_admin FROM administrator WHERE email_admin = ?", [emailAdmin], async (err, rows) => {
    if (!err) {
      if (rows.length > 0) {
        let passwordAdminDB = rows[0].password_admin;
        let comparePassword = await bcryptjs.matchPassword(passwordAdmin, passwordAdminDB);
        if (comparePassword) {
          connectionDb.query("SELECT * FROM category WHERE id_category = ?", [idCategory], async (err, rows) => {
            if (err) {
              return res.status(500).send({
                mensaje: "Error al buscar categoria"
              });
            } else if (rows.length == 0) {
              return res.status(202).send({
                mensaje: "Esta categoria no existe"
              });
            } else if (rows.length > 0) {
              nameCategory = (req.body.category) ? req.body.category : rows[0].name_category;
              photoCategory = (routeImage) ? await cloudinaryUpload.uploadImagesCategories(routeImage) : null;
              urlImage = (photoCategory != null) ? photoCategory.secure_url : rows[0].img_category;
              idImage = (photoCategory != null) ? photoCategory.public_id : rows[0].id_img_category;
              deleteImage = (photoCategory != null) ? await cloudinaryDelete.deleteImage(rows[0].id_img_category) : null;

              connectionDb.query("UPDATE category SET ? WHERE id_category = ?", [{
                name_category: nameCategory,
                img_category: urlImage,
                id_img_category: idImage
              }, idCategory], (err, rows) => {
                if (err) {
                  return res.status(500).send({
                    mensaje: "Error al editar categoria",
                    error: err
                  });
                } else {
                  return res.status(200).send({
                    mensaje: "Categoria editada con exito",
                    rows: rows
                  });
                };
              });
            };
          });
        } else {
          return res.status(500).send({
            mensaje: "Error al editar categoria",
            error: err
          });
        };
      };
    } else {
      return res.status(500).send({
        mensaje: "Error al editar categoria",
        error: err
      });
    };
  });
};

controllerCategory.deleteCategory = (req, res) => {
  let idCategory = (req.body.idCategory) ? req.body.idCategory : null;
  let passwordAdmin = (req.body.password) ? req.body.password : null;
  let emailAdmin = req.user.emailUser;

  connectionDb.query("SELECT password_admin FROM administrator WHERE email_admin = ?", [emailAdmin], async (err, rows) => {
    if (!err) {
      if (rows.length > 0) {
        let passwordAdminDB = rows[0].password_admin;
        let comparePassword = await bcryptjs.matchPassword(passwordAdmin, passwordAdminDB);
        if (comparePassword) {
          connectionDb.query("SELECT * FROM category WHERE id_category = ?", [idCategory], async (err, rows) => {
            if (err) {
              return res.status(500).send({
                mensaje: "Error al buscar categoria"
              });
            } else if (rows.length == 0) {
              return res.status(202).send({
                mensaje: "Esta categoria no existe"
              });
            } else if (rows.length > 0) {
              let deleteImage = await cloudinaryDelete.deleteImage(rows[0].id_img_category);
              connectionDb.query("DELETE FROM category WHERE id_category = ?", [idCategory], async (err, rows) => {
                if (err) {
                  return res.status(500).send({
                    mensaje: "Error al eliminar categoria",
                  });
                } else {
                  return res.status(200).send({
                    mensaje: "Categoria eliminada con exito",
                    rows: rows
                  });
                };
              });
            };
          });
        };
      } else if (rows.length == 0) {
        return res.status(202).send({
          mensaje: "No se encontro el usuario"
        });
      };
    } else {
      return res.status(500).send({
        mensaje: "Error al eliminar categoria"
      });
    };
  });
};

export default controllerCategory;