import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import connectionDB from "../dataBase/dataBase.js";

dotenv.config();

const jsonWebToken = {};

jsonWebToken.generateAccessToken = async (user) => {
  return jwt.sign({
    user
  }, process.env.SECRECT_KEY_JWT, {
    expiresIn: "24h",
  });
};

jsonWebToken.validateToken = (req, res, next) => {
  const accessToken = req.headers["token"] || req.query.accessToken;

  if (!accessToken)
    return res.status("403").send("No cuenta con una verificacion");

  let decoded = jwt.verify(
    accessToken,
    process.env.SECRECT_KEY_JWT,
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(202)
          .send("Acceso denagado, el token expiro o puede ser incorrecto");
      } else {
        req.user = {
          emailUser: result.user.email
        };
        next();
      }
    }
  );
};

jsonWebToken.valideUserCreate = async (req, res, next) => {
  next();
}

jsonWebToken.validateRoleEmployee = async (req, res, next) => {
  const accessToken = req.headers["token"] || req.query.accessToken;

  if (!accessToken) return res.status("403").send("No cuenta con una verificacion");

  let decoded = jwt.verify(
    accessToken,
    process.env.SECRECT_KEY_JWT,
    (err, result) => {
      if (err) {
        res.status(202).send("Acceso denagado, No cuenta con los permisos para acceder a esta ruta");
      } else {
        if (result.user.permise == 2) {
          next();
        }
      }
    }
  );
};

jsonWebToken.validateRoleAdministrator = async (req, res, next) => {
  const accessToken = req.headers["token"] || req.query.accessToken;

  if (!accessToken) return res.status("403").send("No cuenta con una verificacion");

  let decoded = jwt.verify(
    accessToken,
    process.env.SECRECT_KEY_JWT,
    (err, result) => {
      if (err) {
        res.status(202).send("Acceso denagado, No cuenta con los permisos para acceder a esta ruta");
      } else {
        if (result.user.permission == 1) {
          next();
        }
      }
    }
  );
};

jsonWebToken.validateRoleCustomer = async (req, res, next) => {
  const accessToken = req.headers["token"] || req.query.accessToken;

  if (!accessToken) return res.status("403").send("No cuenta con una verificacion");

  let decoded = jwt.verify(
    accessToken,
    process.env.SECRECT_KEY_JWT,
    (err, result) => {
      if (err) {
        res.status(202).send("Acceso denagado, No cuenta con los permisos para acceder a esta ruta");
      } else {
        if (result.user.permission == 3) {
          next();
        }
      }
    }
  );
};

export default jsonWebToken;