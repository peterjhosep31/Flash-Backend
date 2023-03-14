import configEmail from "../../app.js";
const controllerSesion = {};

controllerSesion.registre = async (req, res) => {
    let idUser = req.body.document;
    let nameUser = req.body.name;
    let phoneUser = req.body.phone;
    let emailUser = req.body.email;
    let adressUser = 'armenia'
    let passwordUser = req.body.password;

    req.getConnetion((err, conn) => {
        if (!err) {
            conn.query("INSERT INTO customer SET ?", {
                id_employee: idUser,
                name_employee: nameUser,
                phone_number_employee: phoneUser,
                email_employee: emailUser,
                adress_employee: adressUser,
                password_employee: passwordUser
            }), (err, rows) => {
                if (!err) {
                    configEmail.sendMail({
                        from: process.env.user_email,
                        to: emailUser,
                        subject: "Registro exitoso",
                        html: `
            <h1>Registro exitoso</h1>
            <p>Estimado ${nameUser} su registro fue exitoso</p>
            `
                    }, (err, info) => {
                        if (err) {
                            console.log("_________________________ERROR EMAIL_____________________________");
                            console.log(err);
                            console.log("_________________________________________________________________");
                        } else {
                            console.log("_________________________INFO EMAIL_____________________________");
                            console.log(info);
                            console.log("_________________________________________________________________");
                        }
                    });

                    return res.status(200).json({
                        ok: true,
                        message: "Usuario registrado correctamente"
                    });
                } else {
                    return res.status(500).json({
                        ok: false,
                        message: "Error en la conexión con la base de datos",
                        err: err
                    });
                }
            }

        } else {
            return res.status(500).json({
                ok: false,
                message: "Error en la conexión con la base de datos",
                err: err
            });
        }

    });

}

controllerSesion.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    req.getConnection((err, conn) => {
        if (!err) {
            conn.query('SELECT name_customer, pasword_customer FROM customer WHERE email_customer = ?', [email], (err, rows) => {
                if (!err) {
                    if (rows.length > 0) {
                        let user = rows[0];
                        let passwordHash = user.pasword_customer;
                        bcryptjs.compare(password, passwordHash, (err, result) => {
                            if (result) {
                                session = req.session;
                                session.email = email;
                                let tokenSecurity = jwt.sign({ "userEmail": email }, "token_de_seguridad")
                                console.log("Logeado");
                                return res.status(200).send({
                                    message: "Usuario logeado correctamente",
                                    token: tokenSecurity
                                });
                            } else {
                                return res.status(500).send({
                                    message: "La contraseña es incorrecta"
                                });
                            }
                        })
                    } else {
                        return res.status(500).send({
                            message: "El usuario no existe"
                        });
                    }
                } else {
                    return res.status(500).send({
                        message: "El usuario no existe"
                    });
                }
            })
        } else {
            return res.status(500).send({
                message: "Error al conectar con la base de datos"
            });
        }

    })
}


export default controllerSesion;
