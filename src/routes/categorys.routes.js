import fileUpload from 'express-fileupload';
import { Router } from "express";

import jwtConfiguration from "../config/accessToken/jsonWebToken.js";

import categorys from "../controllers/category.controllers.js";

const routes = Router();

routes.post('/addCategory', jwtConfiguration.validateToken, fileUpload({ useTempFiles: true, tempFileDir: './uploads' }), categorys.postCategory);
routes.delete('/deleteCategory/:code', jwtConfiguration.validateToken, categorys.deleteCategory);
routes.get('/getCategoriesStore', jwtConfiguration.validateToken, categorys.getCategoriesStore);
routes.get('/getProductOne/:code', jwtConfiguration.validateToken, categorys.getCategoryOne);
routes.get('/getCategoryStore', jwtConfiguration.validateToken, categorys.getCategoryStore);
routes.put('/updateCategory/:code', jwtConfiguration.validateToken, categorys.putCategory);

routes.get('/getCategories', categorys.getCategory);

export default routes;