import { Router } from "express";
import fileUpload from 'express-fileupload';

import authSingUp from "../controllers/auth/auth.signUp.controllers.js";
import authSingIn from "../controllers/auth/auth.singIn.controllers.js";
import recover from "../controllers/auth/auth.recoverPassword.js";
import admin from "../controllers/sections/section.Admin.js";
import customer from "../controllers/sections/sessioneCustomer.js";

import jsonWebToken from "../config/accessToken/jsonWebToken.js";

const routes = Router();

routes.put("/recoverPassword", recover.recoverPasswordUserCode);
routes.post("/signUpCustomer", authSingUp.signUpCustomer);
routes.put("/updatePassword", recover.updatePassword);
routes.put("/newPassword", recover.recoverPassword);
routes.post("/signUpAdmin", authSingUp.signUpAdmin);
routes.post("/signInUser", authSingIn.singIn);

routes.post("/validateToken", jsonWebToken.validateToken, authSingUp.signUpAdminToken);

routes.get("/gatDataAccount", jsonWebToken.validateToken, admin.getData);
routes.put("/updateData", jsonWebToken.validateToken, admin.updateProfile);
routes.put("/updateCustomer", jsonWebToken.validateToken, fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
}), customer.updateData);
routes.get("/gatDataCustomer", jsonWebToken.validateToken, customer.getData);


export default routes;