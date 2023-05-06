import connectionDb from "../config/dataBase/dataBase.js";
import cloudinaryUpload from "../config/cloudinary/uploadImages.js";
import cloudinaryDelete from "../config/cloudinary/deleteImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";

const controllerCategory = {};

controllerCategory.postCategory = async (req, res) => {
  try {
    const nameCategory = (req.body.data.category) ? req.body.data.category : null;
    const routeImage = (req.body.data.image) ? req.body.data.image : null;
    let photoCategory = null;
    let urlImage = null;
    let idImage = null;

    if (routeImage) {
      const photoCategory = await cloudinaryUpload.uploadImagesCategories(routeImage);
      urlImage = photoCategory.secure_url;
      idImage = photoCategory.public_id;
    }

    // Insertar la nueva categoría en la base de datos
    await connectionDb.query("INSERT INTO category SET ?", {
      name_category: nameCategory,
      img_category: urlImage,
      id_img_category: idImage
    });
    return res.status(200).send({
      mensaje: "Categoria insertada con exito."
    });

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

controllerCategory.putCategory = async (req, res) => {
  try {
    let nameCategory = req.body.data.name;
    let imageCategory = req.body.data.image;
    let ruteImage = req.body.data.image;
    
    
  } catch (error) {
    
  }
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