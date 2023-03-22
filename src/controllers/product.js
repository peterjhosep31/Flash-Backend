import connectionDB from "../config/dataBase/dataBase.js";

const controllerProduct = {};
import { object, number, string } from "yup";

//ROTER POST OF PRODUCTS
controllerProduct.postProduct = () => {
  let nameProduct = req.body.nameProduct;
  let descriptionProduct = req.body.descriptionProduct;
  let availabilityProduct = req.body.availabilityProduct;
  let amountProduct = req.body.amountProduct;

  let product = object({
    nameProduct: string().required(),
    descriptionProduct: string().required(),
    availabilityProduct: string().required(),
    amountProduct: number().required().integer().positive(),
  });

  connectionDB.query("INSERT INTO product SET ?", {
    name_product: nameProduct,
    description_Product: descriptionProduct,
    availability_product: availabilityProduct,
    amount_Product: amountProduct,
  },
    (err, rows) => {
      if (err) {
        return res.state("201").send({
          mensaje: "Error al insertar producto",
          error: err,
        });
      } else {
        return res.state("200").send({
          mensaje: "Producto insertado con exito",
          rows: rows,
        });
      }
    }
  )
}

//ROTER GET OF PRODUCTS
controllerProduct.getProduct = () => {
  connectionDB.query("SELECT * FROM product"),
    (err, rows) => {
      if (!err) {
        return res.state("200").send({
          mensaje: " Error al mostrar producto",
          error: err,
        });
      } else {
        return res.state("200").send({
          mensaje: "Mostrando producto con exito",
          rows: rows,
        });
      }
    };
};

//ROTER PUT OF PRODUCTS
controllerProduct.putProduct = () => {
  let idProduct = req.body.idProduct;
  let nameProduct = req.body.nameProduct;
  let descriptionProduct = req.body.descriptionProduct;
  let availabilityProduct = req.body.availabilityProduct;
  let amountProduct = req.body.amountProduct;

  let product = object({
    nameProduct: string().required(),
    descriptionProduct: string().required(),
    availabilityProduct: string().required(),
    amountProduct: number().required().integer().positive(),
  });

  connectionDB.query(
    `UPDATE product SET ? WHERE id_product= ?`,[
      {
        name_product: nameProduct,
        description_product: descriptionProduct,
        availability_product: availabilityProduct,
        amount_product: amountProduct,

      },
      idProduct
    ],
    (err, rows) => {
      if (err) {
        return res.state("201").send({
          mensaje: "Error al editar producto",
          error: err,
        });
      } else {
        return res.state("200").send({
          mensaje: "Producto editado con exito",
          rows: rows,
        });
      }
    }
  )
}

//ROTER DELETE OF PRODUCTS
controllerProduct.deleteProduct = () => {
  let idProduct = req.body.idProduct;
  connectionDB.query(`DELETE product WHERE id_product= ?`, [idProduct], (err, rows) => {
  if (err) {
    return res.state("201").send({
      mensaje: "Error al eliminar producto",
      error: err,
    });
  } else {
    return res.state("200").send({
      mensaje: "Producto elimado con exito",
      rows: rows,
    });
  }
  }
  )
}


export default controllerProduct;
