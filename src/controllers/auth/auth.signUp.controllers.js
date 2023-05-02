import connectionDb from "../../config/dataBase/dataBase.js";
import uploadImages from "../../config/cloudinary/uploadImages.js";
import encrypted from "../../config/bcryptjs/encryptPassword.js";

const controllerAuth = {};

controllerAuth.signUpAdmin = async (req, res) => {
  let emailuser = (req.body.email) ? req.body.email : null;
  let nameuser = (req.body.name) ? req.body.name : null;
  let passworduser = (req.body.password) ? req.body.password : null;
  let passwordHash = (passworduser != null) ? await encrypted.encryptPassword(passworduser) : null;
  let codePermission = 1;

  await connectionDb.query("SELECT * FROM administrator WHERE email_admin = ?", [emailuser], async (err, rows) => {
    if (!err) {
      if (rows.length > 0) {
        return res.status("202").send({
          mensaje: "El usuario ya existe",
          userName: rows[0].name_admin
        });
      } else if (rows.length === 0) {
        await connectionDb.query("INSERT INTO administrator SET ?", {
          name_admin: nameuser,
          email_admin: emailuser,
          password_admin: passwordHash,
          id_permissions_admin: codePermission
        }, (err, rows) => {
          if (err) {
            return res.status("202").send({
              mensaje: "Error al registrar el usuario",
              error: err
            });
          } else {
            return res.status("200").send({
              mensaje: "Usuario registrado con exito"
            });
          }
        }
        );
      }
    } else if (err) {
      return res.status("202").send({
        mensaje: "Error al registrar el usuario",
        error: err
      });
    }
  }
  );
};

controllerAuth.signUpEmployee = async (req, res) => {
  let nameUser = (req.body.name) ? req.body.name : null;
  let emailUser = (req.body.email) ? req.body.email : null;
  let passwordUser = (req.body.password) ? req.body.password : null
  let passwordHash = (passwordUser != null) ? await encrypted.encryptPassword(passwordUser) : null;
  let store = (req.body.idStore) ? req.body.idStore : null;
  let codePermission = 2;

  await connectionDb.query(
    "SELECT * FROM employee WHERE email_employee = ?",
    [emailUser],
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
            name_employee: nameUser,
            email_employee: emailUser,
            password_employee: passwordHash,
            state_employee: 'asset',
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
  let nameUser = req.body.name;
  let emailUser = req.body.email;
  let passwordUser = req.body.password;
  let passwordHash = await encrypted.encryptPassword(passwordUser);
  let codePermission = 3;


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
            name_customer: nameUser,
            email_customer: emailUser,
            password_customer: passwordHash,
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