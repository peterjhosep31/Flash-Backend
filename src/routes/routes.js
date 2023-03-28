import express from "express";

import sessionCustomer from "../controllers/sections/sessioneCustomer.js";
import sessionEmployee from "../controllers/sections/seccionsEmpleyoee.js";
import sessionAdmin from "../controllers/sections/SeccionsAdmin.js";
import product from "../controllers/product.js";
import category from "../controllers/category.js";
import store from "../controllers/store.js";
import offer from "../controllers/offer.js";
import validateToken from "../config/accessToken/accessToken";
import generateAccessToken from "../config/accessToken/accessToken";

const routesExpress = express.Router();
routesExpress.use(express.json());

// RUTAS HECHAS POR EL MASSS FEO
// ROUTERS OF SIG IN AND SIG UP - CUSTOMER
routesExpress.get("/loginCustomer", generateAccessToken, sessionCustomer.Login);
routesExpress.get("/getCustomer", validateToken, sessionCustomer.ListDataStaff);
routesExpress.post(
  "/registreCustomer",
  generateAccessToken,
  sessionCustomer.Registre
);
routesExpress.put(
  "/updateCustomer",
  validateToken,
  sessionCustomer.UpdateDataStaff
);
routesExpress.put(
  "/recoverPassCustomer",
  validateToken,
  sessionCustomer.RecoverPassword
);
routesExpress.put(
  "/updatePassCustomer",
  validateToken,
  sessionCustomer.ChangePassword
);
routesExpress.put(
  "/updateEmailCustomer",
  validateToken,
  sessionCustomer.UpdateEmailCustomer
);
routesExpress.delete(
  "/deleteCustomer",
  validateToken,
  sessionCustomer.DeleteDataStaff
);

// ROUTERS OF SIG IN AND SIG UP - EMPLOYOEE
routesExpress.get("/loginEmployee", generateAccessToken, sessionEmployee.Login);
routesExpress.get("/getEmployee", validateToken, sessionEmployee.ListDataStaff);
routesExpress.post(
  "/registreEmployee",
  generateAccessToken,
  sessionEmployee.Registre
);
routesExpress.put(
  "/updateEmployee",
  validateToken,
  sessionEmployee.UpdateDataStaff
);
routesExpress.put(
  "/recoverPassEmployee",
  validateToken,
  sessionEmployee.RecoverPassword
);
routesExpress.put(
  "/updatePassEmployee",
  validateToken,
  sessionEmployee.UpdatePassword
);
routesExpress.put("/stateEmployee", validateToken, sessionEmployee.UpdateState);
routesExpress.put(
  "/updateEmailEmployee",
  validateToken,
  sessionEmployee.UpdateEmail
);
routesExpress.delete(
  "/deleteEmployee",
  validateToken,
  sessionEmployee.DeleteDataStaff
);

// ROUTERS OF SIG IN AND SIG UP - ADMINISTRATOR
routesExpress.get("/loginAdmin", generateAccessToken, sessionAdmin.Login);
routesExpress.get("/getAdmin", validateToken, sessionAdmin.ListDataAdmin);
routesExpress.post(
  "/registreAdmin",
  generateAccessToken,
  sessionAdmin.Registre
);
routesExpress.put("/updateAdmin", validateToken, sessionAdmin.UpdateDataStaff);
routesExpress.put(
  "/apdatePhotoAdmin",
  validateToken,
  sessionAdmin.UpdatePhotoStaff
);
routesExpress.put(
  "/recoverPassAdmin",
  validateToken,
  sessionAdmin.RecoverPassword
);
routesExpress.put(
  "/updatePassAdmin",
  validateToken,
  sessionAdmin.UpdatePassword
);
routesExpress.put(
  "/updateEmailAdmin",
  validateToken,
  sessionAdmin.updateEmailAdmin
);

//RUTAS HECHAS POR LA MASSS HERMOSA
// RUOTES GET, POST,DELETE,PUT OF PRODUCTS
routesExpress.post("/postProduct", validateToken, product.postProduct);
routesExpress.put("/putProduct", validateToken, product.putProduct);
routesExpress.get("/getProduct", validateToken, product.getProduct);
routesExpress.delete("/deleteProduct", validateToken, product.deleteProduct);

//RUOTES GET, POST,DELETE,PUT OF CATEGORY
routesExpress.post("/postCategory", validateToken, category.postCategory);
routesExpress.put("/putCategory", validateToken, category.putCategory);
routesExpress.get("/getCategory", validateToken, category.getCategory);
routesExpress.delete("/deleteCategory", validateToken, category.deleteCategory);

// RUOTES GET, POST,DELETE,PUT OF STORE
routesExpress.post("/postStore", validateToken, store.postStore);
routesExpress.put("/putStore", validateToken, store.putStore);
routesExpress.get("/getStore", validateToken, store.getStore);
routesExpress.delete("/deleteStore", validateToken, store.deleteStore);

// RUOTES GET, POST,DELETE,PUT OF OFFER
routesExpress.post("/postOffer", validateToken, offer.postOffer);
routesExpress.put("/putOffer", validateToken, offer.putOffer);
routesExpress.get("/getOffer", validateToken, offer.getOffer);
routesExpress.delete("/deleteOffer", validateToken, offer.deleteOffer);

export default routesExpress;
