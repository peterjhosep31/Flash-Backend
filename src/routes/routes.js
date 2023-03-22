import express from "express";

import sessionCustomer from "../controllers/sections/sessioneCustomer.js"
import sessionEmployee from "../controllers/sections/seccionsEmpleyoee.js"
import sessionAdmin from "../controllers/sections/SeccionsAdmin.js"
import product from "../controllers/product.js";
import category from "../controllers/category.js";



const routesExpress = express.Router();
routesExpress.use(express.json());

// ROUTERS OF SIG IN AND SIG UP - CUSTOMER
routesExpress.get("/loginCustomer", sessionCustomer.Login);
routesExpress.get("/getCustomer", sessionCustomer.ListDataStaff);
routesExpress.post("/registreCustomer", sessionCustomer.Registre);
routesExpress.put("/updateCustomer", sessionCustomer.UpdateDataStaff);
routesExpress.put("/recoverPassCustomer", sessionCustomer.RecoverPassword);
routesExpress.put("/updatePassCustomer", sessionCustomer.ChangePassword);
routesExpress.put("/updateEmailCustomer", sessionCustomer.UpdateEmailCustomer);
routesExpress.delete("/deleteCustomer", sessionCustomer.DeleteDataStaff);

// ROUTERS OF SIG IN AND SIG UP - EMPLOYOEE
routesExpress.get("/loginEmployee", sessionEmployee.Login);
routesExpress.get("/getEmployee", sessionEmployee.ListDataStaff);
routesExpress.post("/registreEmployee", sessionEmployee.Registre);
routesExpress.put("/updateEmployee", sessionEmployee.UpdateDataStaff);
routesExpress.put("/recoverPassEmployee", sessionEmployee.RecoverPassword);
routesExpress.put("/updatePassEmployee", sessionEmployee.UpdatePassword);
routesExpress.put("/stateEmployee", sessionEmployee.UpdateState);
routesExpress.put("/updateEmailEmployee", sessionEmployee.UpdateEmail);
routesExpress.delete("/deleteEmployee", sessionEmployee.DeleteDataStaff);


// ROUTERS OF SIG IN AND SIG UP - ADMINISTRATOR
routesExpress.get("/loginAdmin", sessionAdmin.Login);
routesExpress.get("/getAdmin", sessionAdmin.ListDataAdmin);
routesExpress.post("/registreAdmin", sessionAdmin.Registre);
routesExpress.put("/updateAdmin", sessionAdmin.UpdateDataStaff);
routesExpress.put("/apdatePhotoAdmin", sessionAdmin.UpdatePhotoStaff);
routesExpress.put("/recoverPassAdmin", sessionAdmin.RecoverPassword);
routesExpress.put("/updatePassAdmin", sessionAdmin.UpdatePassword);
routesExpress.put("/updateEmailAdmin", sessionAdmin.updateEmailAdmin);

//TODO rutas de tati
// RUOTES GET, POST,DELETE,PUT OF PRODUCTS
routesExpress.post("/postProduct", product.postProduct);
routesExpress.put("/putProduct", product.putProduct);
routesExpress.get("/getProduct", product.getProduct);
routesExpress.delete("/deleteProduct", product.deleteProduct);

//RUOTES GET, POST,DELETE,PUT OF CATEGORY
routesExpress.post("/postCategory", category.postCategory);
routesExpress.put("/putCategory", category.putCategory);
routesExpress.get("/getCategory", category.getCategory);
routesExpress.delete("/deleteCategory", category.deleteidCategory);


// // RUOTES GET, POST,DELETE,PUT OF STORE
// routesExpress.post("/postStore", category.postStore);
// routesExpress.put("/putStore", category.putStore);
// routesExpress.get("/getStore", category.getStore);
// routesExpress.delete("/deleteStore", category.deleteStore);

export default routesExpress;
