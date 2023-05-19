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
            <div class="box">
              <img src="https://res.cloudinary.com/djaejhxwz/image/upload/v1683804734/Flash/Bienvenidoa_3_wutgdr.png" alt="">
            </div>
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
    console.log(res);
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
    html: `
      <head>
        <style>
          .containerEmail{ padding:20px; display: flex; align-items: center; justify-content: center; flex-direction: column}
          .box{ width: 100%; height: 30%; background: linear-gradient(to left,#FF13CB,#F6761A) ; display: flex; flex-direction: column; align-items: center; justify-content: center }
          .rol{ font-size: 20px; text-align: center }
          span{ font-size: 17px; text-align: center; color: blue }
          .welcome{ font-size: 30px; text-align: center }
          .boxBig{ display: flex; flex-direction: column; align-items: center; width: 900px; box-shadow: 0 0 10px 0 rgb(206, 206, 206) }
          .box-primary{ width: 80%; background: white; box-shadow: 0 0 5px rgb(124, 124, 124); padding: 10px; height: 30%; position: relative; top: -70px; padding: 20px }
          .box img{ width: 900px }
          .textFlash{ font-size: 20px;}
        </style>
      </head>
      <body>
        <div class="containerEmail">
          <div class="boxBig">
            <div class="box">
              <img src="https://res.cloudinary.com/djaejhxwz/image/upload/v1683804733/Flash/Bienvenidoa_2_br3mag.png" alt="">
            </div>
            <div class="box-primary">
              <div class="welcome">
                ¡Hola ${name}!
              </div>
              <div class="textFlash"><p>Has ingresado con <span>${email}</span> como tu dirreccion de correo electronico de Flash. </p> 
                <p>Disfuta desde ahora de todas las ofertas, productos y servicion que tenemos para ofrecerte </p>
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

// emailCreateUsers.createStore = async (email, name, emailCenter, passwordCenter) => {
//   await configEmail.sendMail({
//     from: '2022.flash.sale@gmail.com',
//     to: email,
//     subject: "Tienda Creada",
//     html: `
//       <head>
//         <style>
//         body{display: flex}
//           .containerEmail{ padding:20px; display: flex; align-items: center; justify-content: center; flex-direction: column}
//           .box{ width: 100%; height: 30%; background: linear-gradient(to left,#FF13CB,#F6761A) ; display: flex; flex-direction: column; align-items: center; justify-content: center}
//           .rol{ font-size: 20px; text-align: center}
//           span{ font-size: 17px; text-align: center; color: blue}
//           .welcome{ font-size: 30px; text-align: center}
//           .boxBig{ display: flex; flex-direction: column; align-items: center; width: 900px; box-shadow: 0 0 10px 0 rgb(206, 206, 206)}
//           .box-primary{ width: 80%; background: white; box-shadow: 0 0 5px rgb(124, 124, 124); padding: 10px; height: 30%; position: relative; top: -70px; padding: 20px}
//           .box img{ width: 900px}
//           .textFlash{ font-size: 20px}
//         </style>
//       </head>
//       <body>
//         <div class="containerEmail">
//           <div class="boxBig">
//             <div class="box">
//               <img src="https://res.cloudinary.com/djaejhxwz/image/upload/v1683804734/Flash/Bienvenidoa_3_wutgdr.png" alt="">
//             </div>
//             <div class="box-primary">
//               <div class="welcome">
//                 ¡Hola ${name}¡
//               </div>
//               <div class="textFlash"><p>Le informamos que ha sido creada su tienda <span>${store}</span>.Sus datos de acceso son los siguientes: </p>
//                 <p>Nombre de Usuario: <span>${emailCenter}</span></p>
//                 <p>Contaseña:${passwordCenter}</p>
//                 <p>Saludos, </br> Equipo de Flash</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </body>
//     `
//   }).then((res) => {
//     console.log(res);
//     return console.log("Send email")
//   }).catch((err) => {
//     return console.log(err);
//   })
// };

export default emailCreateUsers;