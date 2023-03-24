import bcryptjs from "bcryptjs";
import connectionDB from "../config/dataBase/dataBase.js";
import { object, number, string } from "yup";

const controllerOffer = {};

//ROTER POST OF OFFER
controllerOffer.postOffer = () => {
  let idOffer = req.body.idProduct;
  let nameOffer = req.body.nameProduct;
  let descriptionOffer = req.body.descriptionProduct;
  let availabilityOffer = req.body.availabilityProduct;
  let amountOffer = req.body.amountProduct;

  let offer = object({
    idOffer: number().positive().required(),
    nameOffer: string().required(),
    descriptionOffer: string().required(),
    availabilityOffer: string().required(),
    amountOffer: number().required().integer().positive(),
  });

  connectionDB.query(
    "INSERT INTO offer SET ?",
    {
      id_offer: idOffer,
      name_offer: nameOffer,
      description_offer: descriptionOffer,
      amount_offer: availabilityOffer,
      availability_product: amountOffer,
      id_product_offer: 1,
    },
    (err, rows) => {
      if (err) {
        return res.state("201").send({
          mensaje: "Error al insertar oferta",
          error: err,
        });
      } else {
        return res.state("200").send({
          mensaje: "Oferta insertado con exito",
          rows: rows,
        });
      }
    }
  );
};

//ROTER GET OF OFFER
controllerOffer.getOffer = () => {
  connectionDB.query("SELECT * FROM offer"),
    (err, rows) => {
      if (!err) {
        return res.state("200").send({
          mensaje: " Error al mostrar oferta",
          error: err,
        });
      } else {
        return res.state("200").send({
          mensaje: "Mostrando OFERTA con exito",
          rows: rows,
        });
      }
    };
};

//ROTER PUT OF OFFER
controllerOffer.putOffer = () => {
  let idOffer = req.body.idProduct;
  let nameOffer = req.body.nameProduct;
  let descriptionOffer = req.body.descriptionProduct;
  let availabilityOffer = req.body.availabilityProduct;
  let amountOffer = req.body.amountProduct;
  let idEmployee = req.body.idEmpleyee;
  let passwordEmployee = req.body.passwordEmployee;

  let offer = object({
    idOffer: number().positive().required(),
    nameOffer: string().required(),
    descriptionOffer: string().required(),
    availabilityOffer: string().required(),
    amountOffer: number().required().integer().positive(),
    idEmployee: number().required().positive(),
    passwordEmployee: require(),
  });

  connectionDB.query(
    "SELECT password_employed FROM employee WHERE id_employee = ?",
    [idEmployee],
    (err, rows) => {
      if (err) {
        return res.status(202).send({
          mensaje: "Empleado no encontrado",
          error: err,
        });
      }

      let passwordDB = rows[0].password_employed;
      bcryptjs.compare(passwordDB, passwordEmployee, (err, result) => {
        if (result) {
          connectionDB.query(
            `UPDATE offer SET ? WHERE id_offer= ?`,
            [
              {
                name_offer: nameOffer,
                description_offer: descriptionOffer,
                amount_offer: availabilityOffer,
                availability_product: amountOffer,
              },
              idOffer,
            ],
            (err, rows) => {
              if (err) {
                return res.state("201").send({
                  mensaje: "Error al editar oferta",
                  error: err,
                });
              } else {
                return res.state("200").send({
                  mensaje: "Oferta editado con exito",
                  rows: rows,
                });
              }
            }
          );
        }
      });
    }
  );
};

//ROTER DELETE OF OFFER
controllerOffer.deleteOffer = () => {
  let idOffer = req.body.idProduct;
  let idEmployee = req.body.idEmpleyee;
  let passwordEmployee = req.body.passwordEmployee;

  let product = object({
    idOffer: number().required().positive(),
    idEmployee: number().required().positive(),
    passwordEmployee: require(),
  });

  connectionDB.query(
    "SELECT password_employed FROM employee WHERE id_employee = ?",
    [idEmployee],
    (err, rows) => {
      if (err) {
        return res.status(202).send({
          mensaje: "Empleado no encontrado",
          error: err,
        });
      }

      let passwordDB = rows[0].password_employed;
      bcryptjs.compare(passwordDB, passwordEmployee, (err, result) => {
        if (result) {
          connectionDB.query(
            `DELETE offer WHERE id_offer= ?`,
            [idOffer],
            (err, rows) => {
              if (err) {
                return res.state("201").send({
                  mensaje: "Error al eliminar oferta",
                  error: err,
                });
              } else {
                return res.state("200").send({
                  mensaje: "Oferta eliminado con exito",
                  rows: rows,
                });
              }
            }
          );
        }
      });
    }
  );
};

export default controllerOffer;
