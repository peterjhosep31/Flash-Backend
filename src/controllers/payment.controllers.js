import { Stripe } from 'stripe';

import connectionDB from "../config/dataBase/dataBase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const payment = {}

async function paymentBuy(data, controler, cuantiti) {
  if (controler == 0) {

    const lineItems = [];

    // Iterar sobre los objetos y generar los objetos necesarios para Stripe
    for (const item of data) {
      const lineItemPrice = (item.discount !== 0) ? ((item.price_product * item.discount) / 100) * 100 : item.price_product * 100; // Stripe espera el precio en centavos
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
  } else {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          product_data: {
            name: data.name_product,
            description: data.description_product,
            images: [data.img_product],
          },
          currency: 'cop',
          unit_amount: data.price_product * 100,
        },
        quantity: cuantiti,
      }],
      mode: 'payment',
      success_url: `http://localhost:3000/CardProducts/${data.id_product}/routes`,
      cancel_url: `http://localhost:3000/CardProducts/${data.id_product}/routes`,
    });
    return session;

  }

};

payment.paymenteCart = async (req, res) => {
  try {
    let id = req.user.idUser;

    connectionDB.query("SELECT * FROM cardshopping WHERE id_customer = ?", [id], async (err, rows) => {

      if (!err && rows.length > 0) {
        let result = rows
        const response = await paymentBuy(result, 0);
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
  } catch (error) {
    return res.status(500).send({
      mensaje: "Ocurrio un error"
    })
  }
}

payment.paimentDirect = async (req, res) => {
  try {
    let idProduct = req.params.product;

    connectionDB.query("SELECT * FROM product WHERE id_product = ?", [idProduct], async (err, rows) => {
      if (!err && rows.length > 0) {
        let dataProduct = rows[0];
        connectionDB.query("SELECT * FROM store WHERE id_store = ?", [dataProduct.id_store_product], (err, rows) => {
          if (!err && rows.length > 0) {
            let dataStore = rows[0];
            connectionDB.query("INSERT INTO buyspasarela SET ?", {
              id_customer: req.user.idUser,
              price: dataProduct.price_product,
              stores: dataStore.name_store,
              producto: dataProduct.name_product
            }, async (err, rows) => {
              if (!err) {
                const response = await paymentBuy(dataProduct, 1, req.body.data.amount);
                return res.status(200).send({
                  mensaje: "peticion exitosa",
                  url: response.url
                });
              }
            })

          }
        })


      }


    })

  } catch {
    return res.status(500).send({
      mensaje: "Ocurrio un error"
    })
  }
}


export default payment;
/*
      data: {
        price: '-32500',
          amount: '3',
            total: -97500,
              adress: 'Armenia',
                phone: '31155563804',
                  id: '1111823606',
                    venta: 'virtual'
      }
      */