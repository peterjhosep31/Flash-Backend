import {
  Router
} from "express";

import categorys from "../controllers/category.controllers.js"
import jwtConfiguration from "../config/accessToken/jsonWebToken.js"

const routes = Router();

routes.get('/getCategories', categorys.getCategory);
routes.get('/getCategoryStore', jwtConfiguration.validateToken, categorys.getCategoryStore);
routes.post('/addCategory', jwtConfiguration.validateToken, categorys.postCategory);
routes.put('/updateCategory', jwtConfiguration.validateToken, categorys.putCategory);
routes.delete('/deleteCategory', jwtConfiguration.validateToken, categorys.deleteCategory);
routes.post('/addCategory', jwtConfiguration.validateToken, categorys.postCategory);
routes.get('/getCategoryStore', jwtConfiguration.validateToken, categorys.getCategoryStore);
routes.get('/getCategoriesStore', jwtConfiguration.validateToken, categorys.getCategoriesStore);
routes.put('/updateCategory', jwtConfiguration.validateToken, categorys.putCategory);
routes.delete('/deleteCategory', jwtConfiguration.validateToken, categorys.deleteCategory);

export default routes;