import { Router } from "express";

import jwt from "../config/accessToken/jsonWebToken.js"
import category from "../controllers/category.controllers.js";

const routes = Router();

routes.get("/consultationCategories", jwt.validateToken, category.getCategory);
routes.post("/createCategory", [jwt.validateToken, jwt.validateRoleAdministrator], category.postCategory);
routes.put("/updateCategory", [jwt.validateToken, jwt.validateRoleAdministrator], category.putCategory);
routes.delete("/deleteCategory", [jwt.validateToken, jwt.validateRoleAdministrator], category.deleteCategory);

export default routes;