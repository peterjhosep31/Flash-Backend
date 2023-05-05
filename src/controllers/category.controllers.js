import connectionDb from "../config/dataBase/dataBase.js";
import cloudinaryUpload from "../config/cloudinary/uploadImages.js";
import cloudinaryDelete from "../config/cloudinary/deleteImages.js";
import bcryptjs from "../config/bcryptjs/encryptPassword.js";

const controllerCategory = {};

controllerCategory.postCategory = async (req, res) => {
  try {
    const nameCategory = req.body.data.category;
    const routeImage = req.body.data.image;
    const passwordAdmin = req.body.data.password;
    const emailAdmin = req.user.emailUser;
    let photoCategory = null;
    let urlImage = null;
    let idImage = null;

    // Verificar la contraseña del administrador
    let passwordAdminDB;

    const rows = await connectionDb.query("SELECT password_admin FROM administrator WHERE email_admin = ?", [emailAdmin], (err, rows) => {
      if (rows) {
        return passwordAdminDB = rows[0].password_admin;
      }
    });

    if (passwordAdminDB != null) {
      return res.status(202).send({
        mensaje: "Error al registrar categoria: No se encontró el administrador."
      });
    }
    if (passwordAdminDB) {
      const comparePassword = await bcryptjs.matchPassword(passwordAdmin, passwordAdminDB);
      if (!comparePassword) {
        return res.status(202).send({
          mensaje: "Contraseña incorrecta."
        });
      }
    }

    // Buscar si ya existe una categoría con el mismo nombre
    const categoryRows = await connectionDb.query("SELECT * FROM category WHERE name_category = ?", [nameCategory]);
    if (categoryRows.length > 0) {
      return res.status(202).send({
        mensaje: "Esta categoria ya existe."
      });
    }

    // Subir la imagen a Cloudinary (si es que se especificó una)
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
    const idCategory = req.body.codeCategory || null;
    const passwordAdmin = req.body.password || null;
    const routeImage = req.body.image || null;
    const emailAdmin = req.user.emailUser;
    let photoCategory = null;
    let urlImage = null;
    let idImage = null;
    let nameCategory = null;
    let deleteImage = null;

    // Autenticar usuario administrador
    let passwordAdminDB;

    const adminResult = await connectionDb.query("SELECT password_admin FROM administrator WHERE email_admin = ?", [emailAdmin], (err, rows) => {
      if (rows) {
        return passwordAdminDB = rows[0].password_admin;
      }
    });
    if (passwordAdminDB != null) {
      return res.status(401).send({
        mensaje: "No se pudo autenticar al usuario administrador"
      });
    }
    if (passwordAdminDB) {
      const comparePassword = await bcryptjs.compare(passwordAdmin, passwordAdminDB);
      if (!comparePassword) {
        return res.status(401).send({ mensaje: "No se pudo autenticar al usuario administrador" });
      }
    }

    // Buscar categoría
    let category;
    const categoryResult = await connectionDb.query("SELECT * FROM category WHERE id_category = ?", [idCategory], (err, rows) => {
      if (rows) {
        return category = {
          id_category: rows[0].id_category,
          name_category: rows[0].name_category,
          img_category: rows[0].img_category,
          id_img_category: rows[0].id_img_category
        };
      }
    });
    if (category == null) {
      return res.status(404).send({ mensaje: "No se pudo encontrar la categoría solicitada" });
    }
    if (category) {
      console.log(category);

    }

    // // atualizar categorias
    if (category) {
      nameCategory = req.body.category || category.name_category;
      photoCategory = (routeImage) ? await cloudinaryUpload.uploadImagesCategories(routeImage) : null;
      urlImage = (photoCategory != null) ? photoCategory.secure_url : category.img_category;
      idImage = (photoCategory != null) ? photoCategory.public_id : category.id_img_category;
      deleteImage = (photoCategory != null) ? await cloudinaryDelete.deleteImage(category.id_img_category) : null;

      console.log(idCategory);
    }
    // const updateResult = await connectionDb.query(
    //   "UPDATE category SET ? WHERE id_category = ?",
    //   [{ name_category: nameCategory, img_category: urlImage, id_img_category: idImage }, idCategory]
    // );

    // return res.status(200).send({ mensaje: "Categoría editada con éxito", rows: updateResult });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ mensaje: "Ocurrió un error al editar la categoría", error: error.message });
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