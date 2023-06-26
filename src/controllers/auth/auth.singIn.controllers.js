import dotenv from "dotenv";
import encrypted from "../../config/bcryptjs/encryptPassword.js";
import connectionDb from "../../config/dataBase/dataBase.js";
import jwt from "../../config/accessToken/jsonWebToken.js";

dotenv.config();

const controllerAuth = {};

controllerAuth.singIn = async (req, res) => {
  let emailUser = req.body.data.email;
  let passwordUser = req.body.data.password;

  try {
    const [rows, fields] = await connectionDb.promise().query("SELECT * FROM administrator WHERE email_center = ?", [emailUser]);
  console.log(rows);
    if (rows.length > 0) {
      let passwordUserDB = rows[0].password_admin;
      let passwordCompare = await encrypted.matchPassword(passwordUser, passwordUserDB);

      if (passwordCompare) {
        let user = {
          email: rows[0].email_center,
          permission: rows[0].rol
        };
        let rolAdmin = rows[0].rol
        let accessToken = await jwt.generateAccessToken(user);

        return res.status("200").send({
          mensaje: "Usuario logueado con exito",
          accessToken,
          rolAdmin
        });
      } else {
        return res.status("402").send({
          mensaje: "Contraseña incorrecta del administrador"
        });
      }
    } else {
      const [storeRows, storeFields] = await connectionDb.promise().query("SELECT * FROM store WHERE email_store = ?", [emailUser]);

      if (storeRows.length > 0) {
        let passwordUserDB = storeRows[0].password_store;
        let passwordCompare = await encrypted.matchPassword(passwordUser, passwordUserDB);

        if (passwordCompare) {
          let user = {
            email: storeRows[0].email_store,
            idUser: storeRows[0].id_store,
            permission: storeRows[0].rol
          };
          let rolAdmin = storeRows[0].rol
          let accessToken = await jwt.generateAccessToken(user);

          return res.status("200").send({
            mensaje: "Se logueo",
            accessToken,
            rolAdmin
          });
        } else {
          return res.status("402").send({
            mensaje: "Contraseña incorrecta de la tienda"
          });
        }
      } else {
        const [customerRows, customerFields] = await connectionDb.promise().query("SELECT * FROM customer WHERE email_customer = ?", [emailUser]);

        if (customerRows.length > 0) {
          let passwordUserDB = customerRows[0].password_customer;
          let passwordCompare = await encrypted.matchPassword(passwordUser, passwordUserDB);

          if (passwordCompare) {
            let rolAdmin = customerRows[0].rol;
            let user = {
              email: customerRows[0].email_customer,
              idUser: customerRows[0].id_customer,
              permission: customerRows[0].rol
            };
            let accessToken = await jwt.generateAccessToken(user);

            return res.status("200").send({
              mensaje: "Usuario logueado",
              accessToken,
              rolAdmin
            });
          }
        } else {
          return res.status("401").send({
            mensaje: "El Usuario no existe"
          });
        }
      }
    }
  } catch (err) {
    return res.status("400").send({
      mensaje: "Error al iniciar sesión",
      error: err
    });
  }
};

export default controllerAuth;
