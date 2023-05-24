//TODO:Ruta     http://localhost:3105/authUser/signInUser
import dotenv from "dotenv";

import encrypted from "../../config/bcryptjs/encryptPassword.js";
import connectionDb from "../../config/dataBase/dataBase.js";
import jwt from "../../config/accessToken/jsonWebToken.js";

dotenv.config();

const controllerAuth = {};

controllerAuth.singIn = async (req, res) => {
  let emailUser = req.body.data.email;
  let passwordUser = req.body.data.password;

  connectionDb.query("SELECT * FROM administrator WHERE email_admin = ?", [emailUser], async (err, rows) => {
    if (!err) {
      if (rows.length > 0) {
        let passwordUserDB = rows[0].password_admin;
        let passwordCompare = await encrypted.matchPassword(passwordUser, passwordUserDB);
        console.log(passwordUserDB);
        console.log(passwordCompare);
        if (passwordCompare) {
          let user = {
            email: rows[0].email_admin,
            permission: rows[0].rol
          };
          let rolAdmin = rows[0].rol
          let accessToken = await jwt.generateAccessToken(user);
          return res.status("200").send({
            mensaje: "Usuario logueado con exito",
            accessToken, rolAdmin
          });
        } else {
          return res.status("402").send({
            mensaje: "Contraseña incorrecta del administrador"
          });
        }
      } else if (rows.length === 0) {
        await connectionDb.query("SELECT * FROM store WHERE email_store = ?", [emailUser], async (err, rows) => {
          if (!err) {
            if (rows.length > 0) {
              let passwordUserDB = rows[0].password_store;
              let passwordCompare = await encrypted.matchPassword(passwordUser, passwordUserDB);
              console.log(passwordCompare);
              if (passwordCompare) {
                let user = {
                  email: rows[0].email_store,
                  permission: rows[0].rol
                };
                let rolAdmin = rows[0].rol
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
            } else if (rows.length === 0) {
              await connectionDb.query("SELECT * FROM customer WHERE email_customer = ?", [emailUser], async (err, rows) => {
                if (!err) {
                  if (rows.length > 0) {
                    let passwordUserDB = rows[0].password_customer;
                    let passwordCompare = await encrypted.matchPassword(passwordUser, passwordUserDB);
                    if (passwordCompare) {
                      let rolAdmin = rows[0].rol;
                      let user = {
                        email: rows[0].email_customer,
                        permission: rows[0].rol
                      };
                      let accessToken = await jwt.generateAccessToken(user);
                      return res.status("200").send({
                        mensaje: "Usuario logueado",
                        accessToken,
                        rolAdmin
                      });
                    }
                  } else if (rows.length === 0) {
                    return res.status("401").send({
                      mensaje: "El Usuario no existee"
                    });
                  }
                } else {
                  return res.status("400").send({
                    mensaje: "Error al iniciar sesion",
                    error: err
                  });
                }
              }
              );
            }
          } else {
            return res.status("400").send({
              mensaje: "Error al iniciar sesion",
              error: err
            });
          }
        }
        );
      }
    } else if (err) {
      return res.status("400").send({
        mensaje: "Error al iniciar sesion",
      });
    }
  }
  );
};

export default controllerAuth;