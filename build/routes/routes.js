"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _productsRoutes = _interopRequireDefault(require("./products.routes.js"));
var _authRoutes = _interopRequireDefault(require("./auth.routes.js"));
var _categorysRoutes = _interopRequireDefault(require("./categorys.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routesExpress = _express["default"].Router();
routesExpress.use('/products', _productsRoutes["default"]);
routesExpress.use('/authUser', _authRoutes["default"]);
// routesExpress.use('/category', category);

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
// routesExpress.post("/postStore", store.postStore);
// routesExpress.put("/putStore", store.putStore);
// routesExpress.get("/getStore", store.getStore);
// routesExpress.delete("/deleteStore", store.deleteStore);

// // RUOTES GET, POST,DELETE,PUT OF OFFER
// routesExpress.post("/postOffer", offer.postOffer);
// routesExpress.put("/putOffer", offer.putOffer);
// routesExpress.get("/getOffer", offer.getOffer);
// routesExpress.delete("/deleteOffer", offer.deleteOffer);
var _default = routesExpress;
exports["default"] = _default;