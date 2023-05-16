import {Router} from "express";
import fileUpload from "express-fileupload";
import jwtConfiguration from "../config/accessToken/jsonWebToken.js";
import products from "../controllers/product.controllers.js";

const routes = Router();

routes.delete("/deleteProducts/:code", jwtConfiguration.validateToken, products.deleteProduct);
routes.get("/getProductsStore", jwtConfiguration.validateToken, products.getProductStore);
routes.put("/updateProducts/:code", jwtConfiguration.validateToken, products.putProduct);
routes.post("/addProducts", jwtConfiguration.validateToken, fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
}), products.postProduct);
routes.get("/productsConsultation", products.getProduct);

export default routes;