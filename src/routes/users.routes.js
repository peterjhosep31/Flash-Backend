import fileUpload from 'express-fileupload';
import { Router } from "express";

import jsonWebToken from "../config/accessToken/jsonWebToken.js";

import customer from "../controllers/sections/sessioneCustomer.js";
import employee from "../controllers/sections/seccionsEmpleyee.js";
import admin from "../controllers/sections/section.Admin.js";

const routes = Router()

routes.put("/updateData", fileUpload({ useTempFiles: true, tempFileDir: "./uploads", }), jsonWebToken.validateToken, admin.updateProfile);
routes.get("/gatDataAccount", jsonWebToken.validateToken, admin.getData);
routes.get("/getSmall/:limit", admin.getSmalls);

routes.get("/getEmployee", jsonWebToken.validateToken, employee.getData)

routes.put("/updateCustomer", jsonWebToken.validateToken, fileUpload({ useTempFiles: true, tempFileDir: "./uploads", }), customer.updateData);
routes.get("/gatDataCustomer", jsonWebToken.validateToken, customer.getData);


export default routes;