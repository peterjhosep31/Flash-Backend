import { Router } from "express";
import jwtConfiguration from "../config/accessToken/jsonWebToken.js";
import products from "../controllers/product.controllers.js";
import fileUpload from 'express-fileupload';

const routes = Router();

routes.post("/addProducts", jwtConfiguration.validateToken, fileUpload({ useTempFiles: true, tempFileDir: "./uploads", }), products.postProduct);
routes.delete("/deleteProducts/:code", jwtConfiguration.validateToken, products.deleteProduct);
routes.get("/getProductsStore", jwtConfiguration.validateToken, products.getProductStore);
routes.put("/updateProducts/:code", jwtConfiguration.validateToken, products.putProduct);
routes.get("/getProductStoreCustomer/:code", products.getProductCustomer);
routes.get("/productsConsultation/:limit/:code", products.getProduct);
routes.get("/getProductMall/:code/:idStore", products.getProductMall);
routes.get("/getProductDiscount", products.getProductDescount);
routes.get("/getProductOne/:code", products.getProductOne);
routes.get("/getProductCategory", products.getProductCategory)
routes.get("/getProductDate", products.getProductDate);

export default routes;