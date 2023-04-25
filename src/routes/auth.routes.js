import { Router } from "express";

import authSingUp from "../controllers/auth/auth.signUp.controllers.js";
import authSingIn from "../controllers/auth/auth.singIn.controllers.js";
import veryfyAccess from "../config/accessToken/jsonWebToken.js";

const routes = Router();

routes.post("/signUpAdmin", authSingUp.signUpAdmin);
routes.post("/signUpCustomer", authSingUp.signUpCustomer);
routes.post(
  "/signUpEmployee",
  veryfyAccess.validateToken,
  authSingUp.signUpEmployee
);

routes.post("/signInUser", authSingIn.singIn);

export default routes;
