import {
  Router
} from "express";

import authSingUp from "../controllers/auth/auth.signUp.controllers.js";
import authSingIn from "../controllers/auth/auth.singIn.controllers.js";
import jwtConfiguration from "../config/accessToken/jsonWebToken.js";

const routes = Router();

routes.post("/signInUser", authSingIn.singIn);

routes.post("/signUpCustomer", authSingUp.signUpCustomer);
routes.post("/signUpEmployee", authSingUp.signUpEmployee);
routes.post("/signUpAdmin", authSingUp.signUpAdmin);

export default routes;