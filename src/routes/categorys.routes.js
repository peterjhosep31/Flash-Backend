import { Router } from "express";

import jwtConfiguration from "../config/accessToken/jsonWebToken.js";
import categorys from "../controllers/category.controllers.js";
import fileUpload from 'express-fileupload';

const routes = Router();

routes.delete('/deleteCategory/:code', jwtConfiguration.validateToken, categorys.deleteCategory);
routes.get('/getCategoriesStore', jwtConfiguration.validateToken, categorys.getCategoriesStore);
routes.get('/getCategoryStore', jwtConfiguration.validateToken, categorys.getCategoryStore);
routes.put('/updateCategory/:code', jwtConfiguration.validateToken, categorys.putCategory);
routes.post('/addCategory', jwtConfiguration.validateToken, fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}), categorys.postCategory);
routes.get('/getCategories', categorys.getCategory);
routes.get('/getProductOne/:code', jwtConfiguration.validateToken, categorys.getCategoryOne)

export default routes;