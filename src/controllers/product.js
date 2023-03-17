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

  req.getConnection((err, conn) => {
    if (!err) {
      conn.query("INSERT INTO product SET ?", {
        nameProduct: nameProduct,
        description_Product: descriptionProduct,
        availabilityProduct: availabilityProduct,
        amount_Product: amountProduct,
      }),
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
        };
    }
  });
};

//ROTER GET OF PRODUCTS
controllerProduct.getProduct = () => {
  conn.query("SELECT * FROM product"),
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

  req.getConnection((err, conn) => {
    if (!err) {
      conn.query(
        `UPDATE product set nameProduct = ${nameProduct} description_Product = ${descriptionProduct} amount_Product = ${amountProduct} availabilityProduct=${availabilityProduct} WHERE id_product=${req.body.idProduct}`
      ),
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
        };
    }
  });
};

//ROTER DELETE OF PRODUCTS
controllerProduct.deleteProduct = () => {
  let idProduct = req.body.idProduct;

  req.getConnection((err, conn) => {
    if (!err) {
      conn.query(`DELETE product WHERE id_product=${idProduct}`);
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
  });
};

export default controllerProduct;
