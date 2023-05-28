import { Router } from "express";
import jwtConfiguration from "../config/accessToken/jsonWebToken.js";
import products from "../controllers/product.controllers.js";
import fileUpload from 'express-fileupload';

const routes = Router();

routes.delete("/deleteProducts/:code", jwtConfiguration.validateToken, products.deleteProduct);
routes.put("/updateProducts/:code", jwtConfiguration.validateToken, products.putProduct);
routes.post("/addProducts", jwtConfiguration.validateToken, fileUpload({ useTempFiles: true, tempFileDir: "./uploads", }), products.postProduct);
routes.get("/productsConsultation/:limit", products.getProduct);
routes.get("/getProductsStore", jwtConfiguration.validateToken, products.getProductStore);
routes.get("/getProductStoreCustomer/:code", products.getProductCustomer)
routes.get("/getProductDate", products.getProductDate);
routes.get("/getProductOne/:code", products.getProductOne);
routes.get("/getProductDiscount", products.getProductDescount);
routes.get("/getProductMall/:code", products.getProductMall)

export default routes;