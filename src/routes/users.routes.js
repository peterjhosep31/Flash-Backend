import fileUpload from 'express-fileupload';
import { Router } from "express";

import jsonWebToken from "../config/accessToken/jsonWebToken.js";

import customer from "../controllers/sections/sessioneCustomer.js";
import admin from "../controllers/sections/section.Admin.js";

const routes = Router()

routes.put("/updateData", jsonWebToken.validateToken, admin.updateProfile);
routes.get("/gatDataAccount", jsonWebToken.validateToken, admin.getData);
routes.get("/getSmall", admin.getSmalls);

routes.put("/updateCustomer", jsonWebToken.validateToken, fileUpload({ useTempFiles: true, tempFileDir: "./uploads", }), customer.updateData);
routes.get("/gatDataCustomer", jsonWebToken.validateToken, customer.getData);

export default routes;