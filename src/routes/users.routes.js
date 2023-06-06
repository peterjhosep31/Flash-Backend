import fileUpload from 'express-fileupload';
import { Router } from "express";

import jsonWebToken from "../config/accessToken/jsonWebToken.js";

import customer from "../controllers/sections/sessioneCustomer.js";
import admin from "../controllers/sections/section.Admin.js";
import employee from "../controllers/sections/seccionsEmpleyee.js"

const routes = Router()

routes.put("/updateCustomer", jsonWebToken.validateToken, fileUpload({ useTempFiles: true, tempFileDir: "./uploads", }), customer.updateData);
routes.put("/updateData", fileUpload({ useTempFiles: true, tempFileDir: "./uploads", }), jsonWebToken.validateToken, admin.updateProfile);
routes.get("/gatDataCustomer", jsonWebToken.validateToken, customer.getData);
routes.get("/gatDataAccount", jsonWebToken.validateToken, admin.getData);
routes.get("/getSmall/:limit", admin.getSmalls);

routes.get("/getEmployee", jsonWebToken.validateToken, employee.getData)


export default routes;