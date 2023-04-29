import connectionDb from "../../config/dataBase/dataBase.js";
import uploadImagesUser from "../../config/cloudinary/uploadImagesUser.js";
import encrypted from "../../config/bcryptjs/encryptPassword.js";

const controllerAuth = {};

controllerAuth.signUpAdmin = async (req, res) => {
  let iduser = req.body.document;
  let nameuser = req.body.name;
  let emailuser = req.body.email;
  let phoneuser = req.body.phone;
  let passworduser = req.body.password;
  let passwordHash = await encrypted.encryptPassword(passworduser);
  let photoRoute = req.body.image;
  let photo = await uploadImagesUser(photoRoute);
  let urlPhoto = photo.secure_url;
  let idPhoto = photo.public_id;
  let codePermission = 1;

  await connectionDb.query(
    "SELECT * FROM administrator WHERE id_admin = ?",
    [iduser],
    async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          return res.status("202").send({
            mensaje: "El usuario ya existe",
            userName: rows[0].name_admin,
          });
        } else if (rows.length === 0) {
          await connectionDb.query(
            "INSERT INTO administrator SET ?", {
              id_admin: iduser,
              name_admin: nameuser,
              email_admin: emailuser,
              phone_number_admin: phoneuser,
              password_admin: passwordHash,
              img_admin: urlPhoto,
              id_img_admin: idPhoto,
              id_permissions_admin: codePermission,
            },
            (err, rows) => {
              if (err) {
                return res.status("202").send({
                  mensaje: "Error al registrar el usuario",
                  error: err,
                });
              } else {
                return res.status("200").send({
                  mensaje: "Usuario registrado con exito",
                });
              }
            }
          );
        }
      } else if (err) {
        return res.status("202").send({
          mensaje: "Error al registrar el usuario",
          error: err,
        });
      }
    }
  );
};

controllerAuth.signUpEmployee = async (req, res) => {
  let stateUser = null;

  let idUser = req.body.document;
  let nameUser = req.body.name;
  let emailUser = req.body.email;
  let phoneUser = req.body.phone;
  let passwordUser = req.body.password;
  let photoRoute = req.body.image;
  let codePermission = req.body.permission;
  let store = req.body.idStore;

  let state = req.body.stateUser;
  if (state == 1) {
    stateUser = "asset";
  } else if (state == 0) {
    stateUser = "deactivated";
  } else {
    state = "not asset";
  }

  let passwordHash = await encrypted.encryptPassword(passwordUser);
  let photo = await uploadImagesUser(photoRoute);
  let urlPhoto = photo.secure_url;
  let idPhoto = photo.public_id;

  await connectionDb.query(
    "SELECT * FROM employee WHERE id_employee = ?",
    [idUser],
    async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          return res.status("202").send({
            mensaje: "El usuario ya existe",
            userName: rows[0].name_employee,
          });
        } else if (rows.length === 0) {
          await connectionDb.query(
            "INSERT INTO employee SET ?", {
              id_employee: idUser,
              name_employee: nameUser,
              email_employee: emailUser,
              phone_number_employee: phoneUser,
              password_employee: passwordHash,
              img_employee: urlPhoto,
              id_img_employee: idPhoto,
              state_employee: stateUser,
              id_permissions_employee: codePermission,
              id_store: store
            },
            (err, rows) => {
              if (err) {
                return res.status("202").send({
                  mensaje: "Error al registrar el usuario",
                  error: err,
                });
              } else {
                return res.status("200").send({
                  mensaje: "Usuario registrado con exito",
                });
              }
            }
          );
        }
      } else {
        return res.status("202").send({
          mensaje: "Error al registrar el usuario",
          error: err,
        });
      }
    }
  );
};

controllerAuth.signUpCustomer = async (req, res) => {
  let idUser = req.body.document;
  let nameUser = req.body.name;
  let emailUser = req.body.email;
  let phoneUser = req.body.phone;
  let passwordUser = req.body.password;
  let photoRoute = req.body.image;
  let codePermission = req.body.permission;

  let passwordHash = await encrypted.encryptPassword(passwordUser);
  let photo = await uploadImagesUser(photoRoute);
  let urlPhoto = photo.secure_url;
  let idPhoto = photo.public_id;

  await connectionDb.query(
    "SELECT * FROM customer WHERE id_customer = ?",
    [idUser],
    async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          return res.status("202").send({
            mensaje: "El usuario ya existe",
            userName: rows[0].name_customer,
          });
        } else if (rows.length === 0) {
          await connectionDb.query(
            "INSERT INTO customer SET ?", {
              id_customer: idUser,
              name_customer: nameUser,
              email_customer: emailUser,
              phone_number_customer: phoneUser,
              password_customer: passwordHash,
              img_customer: urlPhoto,
              id_img_customer: idPhoto,
              id_permissions_customer: codePermission,
            },
            (err, rows) => {
              if (err) {
                return res.status("202").send({
                  mensaje: "Error al registrar el usuario",
                  error: err,
                });
              } else {
                return res.status("200").send({
                  mensaje: "Usuario registrado con exito",
                });
              }
            }
          );
        }
      } else {
        return res.status("202").send({
          mensaje: "Error al registrar el usuario",
          error: err,
        });
      }
    }
  );
};


export default controllerAuth;