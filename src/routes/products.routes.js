import {
  Router
} from "express";

import products from "../controllers/product.controllers.js";
import jwtConfiguration from "../config/accessToken/jsonWebToken.js"

const routes = Router();

routes.get("/productsConsultation", products.getProduct);
routes.get("/getProductsStore", jwtConfiguration.validateToken, products.getProductStore);
routes.post("/addProducts", jwtConfiguration.validateToken, products.postProduct);
routes.put("/updateProducts", jwtConfiguration.validateToken, products.putProduct);
routes.delete("/deleteProducts", jwtConfiguration.validateToken, products.deleteProduct);

export default routes;