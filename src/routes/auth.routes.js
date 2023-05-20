import { Router } from "express";
import fileUpload from 'express-fileupload';

import jsonWebToken from "../config/accessToken/jsonWebToken.js";


import authSingUp from "../controllers/auth/auth.signUp.controllers.js";
import authSingIn from "../controllers/auth/auth.singIn.controllers.js";
import recover from "../controllers/auth/auth.recoverPassword.js";


const routes = Router();

routes.post("/validateToken", jsonWebToken.validateToken, authSingUp.signUpAdminToken);
routes.put("/recoverPassword", recover.recoverPasswordUserCode);
routes.post("/signUpAdmin/:token", authSingUp.signUpAdmin);
routes.post("/signUpCustomer", authSingUp.signUpCustomer);
routes.put("/updatePassword", recover.updatePassword);
routes.put("/newPassword", recover.recoverPassword);
routes.post("/signInUser", authSingIn.singIn);

export default routes;