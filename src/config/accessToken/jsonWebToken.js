import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const jsonWebToken = {};

jsonWebToken.generateAccessToken = async (user) => {
  return jwt.sign({ user }, process.env.SECRECT_KEY_JWT, {
    expiresIn: "1d",
  });
};

jsonWebToken.validateToken = (req, res, next) => {
  const accessToken = req.headers["token"] || req.query.accessToken;
  console.log(accessToken);

  if (!accessToken)
    return res.status("403").send("No cuenta con una verificacion");

  let decoded = jwt.verify(
    accessToken,
    process.env.SECRECT_KEY_JWT,
    (err, result) => {
      if (err) {
        res.status(202).send("Acceso denagado, el token expiro o puede ser incorrecto");
      } else {
        next();
      }
    }
  );

  /*

  jwt.verify(accessToken, process.env.secret, (err, result) => {
    if (err) {
      res.send("Access denied, token expired or incorrect");
    } else {
      req.email = email;
      req.password = password;
      next();
    }
  });
  */
};

export default jsonWebToken;
