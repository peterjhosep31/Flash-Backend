import configEmail from "./emailConfig.js";

const emailRecoverPassword = {};

emailRecoverPassword.recoverPassword = async (email,code, name) => {
  configEmail.sendMail({
    from: process.env.userEmail,
    to: email,
    subject: "Recuperar Contraseña",
    html: `
      <head>
        <style>
          .containerEmail{ padding:20px;display: flex;align-items: center;justify-content: center;flex-direction: column }
          .box{width: 100%;height: 30%;background: linear-gradient(to left,#FF13CB,#F6761A) ;display: flex;flex-direction: column;align-items: center;justify-content: center }
          .rol{font-size: 20px;text-align: center }
          span{font-size: 17px;text-align: center;color: blue }
          .welcome{font-size: 30px; text-align: center }
          .boxBig{ display: flex; flex-direction: column; align-items: center; width: 900px; box-shadow: 0 0 10px 0 rgb(206, 206, 206) }
          .box-primary{ width: 80%; background: white; box-shadow: 0 0 5px rgb(124, 124, 124); padding: 10px; height: 30%; position: relative; top: -70px; padding: 20px }
          .box img{ width: 900px }
          .textFlash{ font-size: 20px }
        </style>
      </head>
      <body>
        <div class="containerEmail">
          <div class="boxBig">
            <div class="box-primary">
              <div class="welcome">
                ¡Hola ${name}!
              </div>
              <div class="textFlash"><p>Hemos Recibido tu solicitud para restablecer la contraseña de Flash </p>
                <p>Codigo:${code}</p>
                <p>Saludos, </br> Equipo de Flash</p>
              </div>
            </div>
          </div>
        </div>
      </body>
    `
  }).then((res) => {
    console.log("Send email")
  }).catch((err) => {
    console.log(err);
  })
};

export default emailRecoverPassword;