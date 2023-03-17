import express from "express";
import session from "../controllers/session.js";
import product from "../controllers/product.js";
import category from "../controllers/category.js";

const routesExpress = express.Router();

// ROUTERS OF SIG IN AND SIG UP
routesExpress.post("/registre", session.registre);
routesExpress.post("/login", session.login);

//RUOTES GET, POST,DELETE,PUT OF PRODUCTS
routesExpress.post("/postProduct", product.postProduct);
routesExpress.put("/putProduct", product.putProduct);
routesExpress.get("/getProduct", product.getProduct);
routesExpress.delete("/deleteProduct", product.deleteProduct);

//RUOTES GET, POST,DELETE,PUT OF CATEGORY
routesExpress.post("/postCategory", category.postCategory);
routesExpress.put("/putCategory", category.putCategory);
routesExpress.get("/getCategory", category.getCategory);
routesExpress.delete("/deleteCategory", category.deleteCategory);


//RUOTES GET, POST,DELETE,PUT OF STORE
routesExpress.post("/postStore", category.postStore);
routesExpress.put("/putStore", category.putStore);
routesExpress.get("/getStore", category.getStore);
routesExpress.delete("/deleteStore", category.deleteStore);

export default routesExpress;
