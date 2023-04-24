import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function generateAccessToken(email, password) {
  return jwt.sign({ email, password }, process.env.SECRECT_KEY_JWT, {
    expiresIn: "1h",
  });
}
