import { Router } from "express";

import authSingUp from "../controllers/auth/auth.signUp.controllers.js";
import authSingIn from "../controllers/auth/auth.singIn.controllers.js";
import recover from "../controllers/auth/auth.recoverPassword.js";
import admin from "../controllers/sections/section.Admin.js";

import jsonWebToken from "../config/accessToken/jsonWebToken.js";

const routes = Router();

routes.put("/recoverPassword", recover.recoverPasswordUserCode);
routes.post("/signUpCustomer", authSingUp.signUpCustomer);
routes.put("/updatePassword", recover.updatePassword);
routes.put("/newPassword", recover.recoverPassword);
routes.post("/signUpAdmin", authSingUp.signUpAdmin);
routes.post("/signUpSuperAdmin/:token", authSingIn.sigInAdmin);
routes.post("/signInUser", authSingIn.singIn);

routes.get("/gatDataAccount", jsonWebToken.validateToken, admin.getData)



export default routes;