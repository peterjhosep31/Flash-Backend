import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function validateToken(req, res, next) {
  const accessToken = req.header["authorization"] || req.query.accessToken;
  if (!accessToken) res.send("Access denied");

  jwt.verify(accessToken, process.env.secret, (err, result) => {
    if (err) {
      res.send("Access denied, token expired or incorrect");
    } else {
      req.email = email;
      req.password = password;
      next();
    }
  });
}
