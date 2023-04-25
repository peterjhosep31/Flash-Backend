import { Router } from "express";

import products from "../controllers/product.controllers.js";
import veryfyAccess from "../config/accessToken/jsonWebToken.js"
 
const routes = Router();

routes.get("/productsConsultation", products.getProduct);
routes.post("/addProducts", veryfyAccess.validateToken, products.postProduct);
// routes.put("/updateProducts", veryfyAccess.validateToken, products.putProduct);
// routes.delete("/deleteProducts", veryfyAccess.validateToken, products.deleteProduct);


export default routes;