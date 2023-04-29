import {
  Router
} from "express";

import categorys from "../controllers/category.controllers.js"
import jwtConfiguration from "../config/accessToken/jsonWebToken.js"

const routes = Router();

routes.get('/categorysCponsultation', categorys.getCategory);
routes.post('/addCategory', jwtConfiguration.validateToken, categorys.postCategory)
routes.put('/updateCategory', jwtConfiguration.validateToken, categorys.putCategory)
routes.delete('/deleteCategory', jwtConfiguration.validateToken, categorys.deleteCategory)

export default routes;