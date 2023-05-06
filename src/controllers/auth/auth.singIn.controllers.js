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
        if (passwordCompare) {
          let user = {
            email: rows[0].email_admin,
            permission: rows[0].rol
          };
          let accessToken = await jwt.generateAccessToken(user);
          return res.status("200").send({
            mensaje: "Usuario logueado con exito",
            accessToken,
            rol: rows[0].rol
          });
        } else {
          return res.status("202").send({
            mensaje: "Contraseña incorrecta"
          });
        }
      } else if (rows.length === 0) {
        await connectionDb.query("SELECT * FROM store WHERE email_store = ?", [emailUser], async (err, rows) => {
          if (!err) {
            if (rows.length > 0) {
              let passwordUserDB = rows[0].passwod_store;
              let passwordCompare = await encrypted.matchPassword(passwordUser, passwordUserDB);
              if (passwordCompare) {
                await connectionDb.query('SELECT * FROM employee WHERE id_store = ?', [rows[0].id_store], async (err, rows) => {
                  if (!err) {
                     if(rows.length > 0) {
                      let user = {
                        email: emailUser,
                        permission: rows[0].rol
                      };
                      let accessToken = await jwt.generateAccessToken(user);
                      return res.status("200").send({
                        mensaje: "Usuario logueado con exito",
                        accessToken,
                        rol: rows[0].rol
                      });
                     }
                  }
                });
              } else {
                return res.status("202").send({
                  mensaje: "Contraseña incorrecta"
                });
              }
            } else if (rows.length === 0) {
              await connectionDb.query("SELECT * FROM customer WHERE email_customer = ?", [emailUser], async (err, rows) => {
                if (!err) {
                  if (rows.length > 0) {
                    let passwordUserDB = rows[0].password_customer;
                    let passwordCompare = await encrypted.matchPassword(passwordUser, passwordUserDB);
                    if (passwordCompare) {
                      let user = {
                        email: rows[0].email_customer,
                        permission: rows[0].rol
                      };
                      let accessToken = await jwt.generateAccessToken(user);
                      return res.status("200").send({
                        mensaje: "Usuario logueado",
                        accessToken,
                        rol: rows[0].rol
                      });
                    }
                  } else if (rows.length === 0) {
                    return res.status("202").send({
                      mensaje: "El Usuario no existee"
                    });
                  }
                } else {
                  return res.status("202").send({
                    mensaje: "Error al iniciar sesion",
                    error: err
                  });
                }
              }
              );
            }
          } else {
            return res.status("202").send({
              mensaje: "Error al iniciar sesion",
              error: err
            });
          }
        }
        );
      }
    } else if (err) {
      return res.status("202").send({
        mensaje: "Error al iniciar sesion",
      });
    }
  }
  );
};

export default controllerAuth;