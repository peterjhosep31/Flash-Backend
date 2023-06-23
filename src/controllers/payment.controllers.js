import { Stripe } from 'stripe';

import connectionDB from "../config/dataBase/dataBase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const payment = {}

async function paymentBuy(data, total) {
  const lineItems = [];

  // Iterar sobre los objetos y generar los objetos necesarios para Stripe
  for (const item of data) {
    const lineItemPrice = (item.discount !== 0) ? ((item.price_product  * item.discount) / 100) * 100 : item.price_product * 100; // Stripe espera el precio en centavos
    const productData = {
      name: item.name_product,
      description: item.description_product,
      images: [item.img_producto],
    };

    const lineItem = {
      price_data: {
        product_data: productData,
        currency: 'cop',
        unit_amount: lineItemPrice,
      },
      quantity: 1,
    };

    lineItems.push(lineItem);
  }  

  // Crear la sesión de Stripe con los line_items adecuados
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:3000/cart/payment-buy',
    cancel_url: 'http://localhost:3000/cart/payment-process',
  });
  return session

};

payment.paymenteCart = async (req, res) => {
  let total = req.params.price
  let adressCustomer = req.body.data.adress;
  let phoneCustomer = req.body.data.phone;
  let idCustomer = req.body.data.id;
  let typeBuy = req.body.data.venta;
  let emailCustomer = req.user.emailUser;
  let id = req.user.idUser;
  connectionDB.query("SELECT * FROM cardshopping WHERE id_customer = ?", [id], async (err, rows) => {
    if (!err && rows.length > 0) {
      let result = rows
      const response = await paymentBuy(result, total)
      console.log(response);
      return res.status(200).send({
        mensaje: "peticion exitosa",
        url: response.url
      });
    } else {
      return res.status(404).send({
        mensaje: "no se encontro el usuario",
        err
      })
    }
  })
}


export default payment;