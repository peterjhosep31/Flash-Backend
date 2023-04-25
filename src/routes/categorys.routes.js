import { Router } from "express";

import categorys from "../controllers/category.controllers.js"
import veryfyAccess from "../config/accessToken/jsonWebToken.js"

const routes = Router();

routes.get('/categorysCponsultation', categorys.getCategory);
routes.post('/addCategory', veryfyAccess.validateToken, categorys.postCategory)
routes.put('/updateCategory', veryfyAccess.validateToken, categorys.putCategory)
routes.delete('/deleteCategory', veryfyAccess.validateToken, categorys.deleteCategory)

export default routes;
