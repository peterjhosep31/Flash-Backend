const jwt = require("jsonwebtoken");
require("dotenv").config();

const email={emailUser: emailUser};
const password={passwordUser: passwordUser};

const accessToken = generateAccessToken(email, password);
res.header("authorization", accessToken).json({
  message: "usuario autenticado con exito",
  token: accessToken,
});

export function generateAccessToken(email, password) {
  return jwt.sign(email, password, process.env.secret, { expires: "10m" });
}

export function validateToken(req, res, next) {
  const accessToken = req.header["authorization"] || req.query.accessToken;
  if (!accessToken) res.send("Access denied");

  jwt.verify(accessToken, process.env.secret, (err, result) => {
    if (err) {
      res.send("Access denied, token expired or incorrect");
    } else {
        req.email=email;
        req.password=password;
        next();

    }
  });
}

