import configEmail from "./emailConfig.js";

const emailCreateUsers = {};

emailCreateUsers.createStore = async (email, name, store, emailStore, passwordStore) => {
  await configEmail.sendMail({
    from: '2022.flash.sale@gmail.com',
    to: email,
    subject: "Tienda Creada",
    html: `
      <head>
        <style>
        body{display: flex}
          .containerEmail{ padding:20px; display: flex; align-items: center; justify-content: center; flex-direction: column}
          .box{ width: 100%; height: 30%; background: linear-gradient(to left,#FF13CB,#F6761A) ; display: flex; flex-direction: column; align-items: center; justify-content: center}
          .rol{ font-size: 20px; text-align: center}
          span{ font-size: 17px; text-align: center; color: blue}
          .welcome{ font-size: 30px; text-align: center}
          .boxBig{ display: flex; flex-direction: column; align-items: center; width: 900px; box-shadow: 0 0 10px 0 rgb(206, 206, 206)}
          .box-primary{ width: 80%; background: white; box-shadow: 0 0 5px rgb(124, 124, 124); padding: 10px; height: 30%; position: relative; top: -70px; padding: 20px}
          .box img{ width: 900px}
          .textFlash{ font-size: 20px}
        </style>
      </head>
      <body>
        <div class="containerEmail">
          <div class="boxBig">
            <div class="box-primary">
              <div class="welcome">
                ¡Hola ${name}¡
              </div>
              <div class="textFlash"><p>Le informamos que ha sido creada su tienda <span>${store}</span>.Sus datos de acceso son los siguientes: </p>
                <p>Nombre de Usuario: <span>${emailStore}</span></p>
                <p>Contaseña:${passwordStore}</p>
                <p>Saludos, </br> Equipo de Flash</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    `
  }).then((res) => {
    return console.log("Send email")
  }).catch((err) => {
    return console.log("Error correo: ", err);
  })
};

emailCreateUsers.confirmUser = async (email, name) => {
  await configEmail.sendMail({
    from: '2022.flash.sale@gmail.com',
    to: email,
    subject: "Usuario Registrado",
    html: `<div style="padding: 20px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
  <div style="display: flex; flex-direction: column; align-items: center; width: 900px; box-shadow: 0 0 10px 0 rgb(206, 206, 206);">
    <div style="width: 80%; background: white; box-shadow: 0 0 5px rgb(124, 124, 124); padding: 10px; padding-top: 50px;">
      <div style="font-size: 30px; text-align: center;">¡Hola ${name}!</div>
      <div style="font-size: 20px;">
        <p>Has ingresado con <span style="font-size: 17px; text-align: center; color: blue;">${email}</span> como tu dirección de correo electrónico de Flash.</p>
        <p>Disfruta desde ahora de todas las ofertas, productos y servicios que tenemos para ofrecerte.</p>
        <p>Saludos,</br>Equipo de Flash</p>
      </div>
    </div>
  </div>
</div>
    `
  }).then((res) => {
    return console.log("Send email")
  }).catch((err) => {
    return console.log(err);
  })
};

emailCreateUsers.createCenter = async (email, name, passwordCenter, emailCenter) => {
  await configEmail.sendMail({
    from: '2022.flash.sale@gmail.com',
    to: email,
    subject: "Tienda Centro comercial Creado",
    html: `
      <head>
        <style>
        body{display: flex}
          .containerEmail{ padding:20px; display: flex; align-items: center; justify-content: center; flex-direction: column}
          .box{ width: 100%; height: 30%; background: linear-gradient(to left,#FF13CB,#F6761A) ; display: flex; flex-direction: column; align-items: center; justify-content: center}
          .rol{ font-size: 20px; text-align: center}
          span{ font-size: 17px; text-align: center; color: blue}
          .welcome{ font-size: 30px; text-align: center}
          .boxBig{ display: flex; flex-direction: column; align-items: center; width: 900px; box-shadow: 0 0 10px 0 rgb(206, 206, 206)}
          .box-primary{ width: 80%; background: white; box-shadow: 0 0 5px rgb(124, 124, 124); padding: 10px; height: 30%; position: relative; top: -70px; padding: 20px}
          .box img{ width: 900px}
          .textFlash{ font-size: 20px}
        </style>
      </head>
      <body>
        <div class="containerEmail">
          <div class="boxBig">
            <div class="box-primary">
              <div class="welcome">
                ¡Hola ${name}¡
              </div>
              <div class="textFlash"><p>Le informamos que ha sido creada su centro comercial. Sus datos de acceso son los siguientes: </p>
                <p>Nombre de Usuario: <span>${email}</span></p>
                <p>Usuario:${emailCenter}</p>
                <p>Contaseña:${passwordCenter}</p>
                <p>Saludos, </br> Equipo de Flash</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    `
  }).then((res) => {
    return console.log("Send email")
  }).catch((err) => {
    return console.log(err);
  })
};

export default emailCreateUsers;