import dotenv from "dotenv";

import encrypted from "../../config/bcryptjs/encryptPassword.js";
import connectionDb from "../../config/dataBase/dataBase.js";
import jwt from "../../config/accessToken/jsonWebToken.js";

dotenv.config();

const controllerAuth = {};

controllerAuth.singIn = async (req, res) => {
  let email = req.body.emailUser;
  let password = req.body.passwordUser;


  connectionDb.query(
    "SELECT * FROM administrator WHERE email_admin = ?", [email], async (err, rows) => {
      if (!err) {
        if (rows.length > 0) {
          let passwordUser = rows[0].password_admin;
          let passwordCompare = await encrypted.matchPassword(password, passwordUser);
          if (passwordCompare) {
            let user = {
              email: rows[0].email_admin,
              permission: rows[0].id_permissions_admin
            };
            let accessToken = await jwt.generateAccessToken(user);
            return res.status("200").send({
              mensaje: "Usuario logueado con exito",
              accessToken
            });
          } else {
            return res.status("202").send({
              mensaje: "Contraseña incorrecta"
            });
          }
        } else if (rows.length === 0) {
          await connectionDb.query("SELECT * FROM employee WHERE email_employee = ?", [email], async (err, rows) => {
            if (!err) {
              if (rows.length > 0) {
                let passwordUser = rows[0].password_employee;
                let passwordCompare = await encrypted.matchPassword(password, passwordUser);
                if (passwordCompare) {
                  let user = {
                    email: rows[0].email_employee,
                    permission: rows[0].id_permissions_employee
                  };
                  let accessToken = await jwt.generateAccessToken(user);
                  return res.status("200").send({
                    mensaje: "Se logueo",
                    accessToken
                  });
                } else {
                  return res.status("202").send({
                    mensaje: "Contraseña incorrecta"
                  });
                }
              } else if (rows.length === 0) {
                await connectionDb.query("SELECT * FROM customer WHERE email_customer = ?", [email], async (err, rows) => {
                  if (!err) {
                    if (rows.length > 0) {
                      let passwordUser = rows[0].password_customer;
                      let passwordCompare = await encrypted.matchPassword(password, passwordUser);
                      if (passwordCompare) {
                        let user = {
                          email: rows[0].email_customer,
                          permission: rows[0].id_permissions_customer
                        };
                        let accessToken = await jwt.generateAccessToken(user);
                        return res.status("200").send({
                          mensaje: "Usuario logueado",
                          accessToken
                        });
                      }
                    } else if (rows.length === 0) {
                      return res.status("202").send({
                        mensaje: "El Usuario no existe"
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
          error: err
        });
      }
    }
  );
};

export default controllerAuth;