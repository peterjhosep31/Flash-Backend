import express from "express";

import productsRoutes from './products.routes.js';
import authUserRoutes from './auth.routes.js';
import storeRoutes from "./store.routes.js";
import categoryRoutes from "./categorys.routes.js";


const routesExpress = express.Router();

routesExpress.use('/authUser', authUserRoutes);
routesExpress.use('/stores',  storeRoutes);
routesExpress.use('/categories', categoryRoutes);


// routesExpress.use('/products', productsRoutes);




// // ROUTERS OF SIG IN AND SIG UP - CUSTOMER
// routesExpress.get("/getCustomer", sessionCustomer.ListDataStaff);
// routesExpress.post("/registreCustomer", sessionCustomer.Registre);
// routesExpress.put("/updateCustomer", sessionCustomer.UpdateDataStaff);
// routesExpress.put("/recoverPassCustomer", sessionCustomer.RecoverPassword);
// routesExpress.put("/updatePassCustomer", sessionCustomer.ChangePassword);
// routesExpress.put("/updateEmailCustomer", sessionCustomer.UpdateEmailCustomer);
// routesExpress.delete("/deleteCustomer", sessionCustomer.DeleteDataStaff);

// // ROUTERS OF SIG IN AND SIG UP - EMPLOYOEE
// routesExpress.get("/getEmployee", sessionEmployee.ListDataStaff);
// routesExpress.post("/registreEmployee", sessionEmployee.Registre);
// routesExpress.put("/updateEmployee", sessionEmployee.UpdateDataStaff);
// routesExpress.put("/recoverPassEmployee", sessionEmployee.RecoverPassword);
// routesExpress.put("/updatePassEmployee", sessionEmployee.UpdatePassword);
// routesExpress.put("/stateEmployee", sessionEmployee.UpdateState);
// routesExpress.put("/updateEmailEmployee", sessionEmployee.UpdateEmail);
// routesExpress.delete("/deleteEmployee", sessionEmployee.DeleteDataStaff);

// // ROUTERS OF SIG IN AND SIG UP - ADMINISTRATOR
// routesExpress.get("/getAdmin", sessionAdmin.ListDataAdmin);
// routesExpress.post("/registreAdmin", sessionAdmin.Registre);
// routesExpress.put("/updateAdmin", sessionAdmin.UpdateDataStaff);
// routesExpress.put("/apdatePhotoAdmin", sessionAdmin.UpdatePhotoStaff);
// routesExpress.put("/recoverPassAdmin", sessionAdmin.RecoverPassword);
// routesExpress.put("/updatePassAdmin", sessionAdmin.UpdatePassword);
// routesExpress.put("/updateEmailAdmin", sessionAdmin.updateEmailAdmin);

// //RUOTES GET, POST,DELETE,PUT OF CATEGORY
// routesExpress.post("/postCategory", category.postCategory);
// routesExpress.put("/putCategory", category.putCategory);
// routesExpress.get("/getCategory", category.getCategory);
// routesExpress.delete("/deleteCategory", category.deleteCategory);


// // RUOTES GET, POST,DELETE,PUT OF STORE


// // RUOTES GET, POST,DELETE,PUT OF OFFER
// routesExpress.post("/postOffer", offer.postOffer);
// routesExpress.put("/putOffer", offer.putOffer);
// routesExpress.get("/getOffer", offer.getOffer);
// routesExpress.delete("/deleteOffer", offer.deleteOffer);

export default routesExpress;