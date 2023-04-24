"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _sessioneCustomer = _interopRequireDefault(require("../controllers/sections/sessioneCustomer.js"));
var _seccionsEmpleyoee = _interopRequireDefault(require("../controllers/sections/seccionsEmpleyoee.js"));
var _SeccionsAdmin = _interopRequireDefault(require("../controllers/sections/SeccionsAdmin.js"));
var _product = _interopRequireDefault(require("../controllers/product.js"));
var _category = _interopRequireDefault(require("../controllers/category.js"));
var _store = _interopRequireDefault(require("../controllers/store.js"));
var _offer = _interopRequireDefault(require("../controllers/offer.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var routesExpress = _express["default"].Router();
routesExpress.use(_express["default"].json());

// RUTAS HECHAS POR EL MASSS FEO
// ROUTERS OF SIG IN AND SIG UP - CUSTOMER
routesExpress.get("/loginCustomer", _sessioneCustomer["default"].Login);
routesExpress.get("/getCustomer", _sessioneCustomer["default"].ListDataStaff);
routesExpress.post("/registreCustomer", _sessioneCustomer["default"].Registre);
routesExpress.put("/updateCustomer", _sessioneCustomer["default"].UpdateDataStaff);
routesExpress.put("/recoverPassCustomer", _sessioneCustomer["default"].RecoverPassword);
routesExpress.put("/updatePassCustomer", _sessioneCustomer["default"].ChangePassword);
routesExpress.put("/updateEmailCustomer", _sessioneCustomer["default"].UpdateEmailCustomer);
routesExpress["delete"]("/deleteCustomer", _sessioneCustomer["default"].DeleteDataStaff);

// ROUTERS OF SIG IN AND SIG UP - EMPLOYOEE
routesExpress.get("/loginEmployee", _seccionsEmpleyoee["default"].Login);
routesExpress.get("/getEmployee", _seccionsEmpleyoee["default"].ListDataStaff);
routesExpress.post("/registreEmployee", _seccionsEmpleyoee["default"].Registre);
routesExpress.put("/updateEmployee", _seccionsEmpleyoee["default"].UpdateDataStaff);
routesExpress.put("/recoverPassEmployee", _seccionsEmpleyoee["default"].RecoverPassword);
routesExpress.put("/updatePassEmployee", _seccionsEmpleyoee["default"].UpdatePassword);
routesExpress.put("/stateEmployee", _seccionsEmpleyoee["default"].UpdateState);
routesExpress.put("/updateEmailEmployee", _seccionsEmpleyoee["default"].UpdateEmail);
routesExpress["delete"]("/deleteEmployee", _seccionsEmpleyoee["default"].DeleteDataStaff);

// ROUTERS OF SIG IN AND SIG UP - ADMINISTRATOR
routesExpress.post("/loginAdmin", _SeccionsAdmin["default"].Login);
routesExpress.get("/getAdmin", _SeccionsAdmin["default"].ListDataAdmin);
routesExpress.post("/registreAdmin", _SeccionsAdmin["default"].Registre);
routesExpress.put("/updateAdmin", _SeccionsAdmin["default"].UpdateDataStaff);
routesExpress.put("/apdatePhotoAdmin", _SeccionsAdmin["default"].UpdatePhotoStaff);
routesExpress.put("/recoverPassAdmin", _SeccionsAdmin["default"].RecoverPassword);
routesExpress.put("/updatePassAdmin", _SeccionsAdmin["default"].UpdatePassword);
routesExpress.put("/updateEmailAdmin", _SeccionsAdmin["default"].updateEmailAdmin);

//RUTAS HECHAS POR LA MASSS HERMOSA
// RUOTES GET, POST,DELETE,PUT OF PRODUCTS
routesExpress.post("/postProduct", _product["default"].postProduct);
routesExpress.put("/putProduct", _product["default"].putProduct);
routesExpress.get("/getProduct", _product["default"].getProduct);
routesExpress["delete"]("/deleteProduct", _product["default"].deleteProduct);

//RUOTES GET, POST,DELETE,PUT OF CATEGORY
routesExpress.post("/postCategory", _category["default"].postCategory);
routesExpress.put("/putCategory", _category["default"].putCategory);
routesExpress.get("/getCategory", _category["default"].getCategory);
routesExpress["delete"]("/deleteCategory", _category["default"].deleteCategory);

// RUOTES GET, POST,DELETE,PUT OF STORE
routesExpress.post("/postStore", _store["default"].postStore);
routesExpress.put("/putStore", _store["default"].putStore);
routesExpress.get("/getStore", _store["default"].getStore);
routesExpress["delete"]("/deleteStore", _store["default"].deleteStore);

// RUOTES GET, POST,DELETE,PUT OF OFFER
routesExpress.post("/postOffer", _offer["default"].postOffer);
routesExpress.put("/putOffer", _offer["default"].putOffer);
routesExpress.get("/getOffer", _offer["default"].getOffer);
routesExpress["delete"]("/deleteOffer", _offer["default"].deleteOffer);
var _default = routesExpress;
exports["default"] = _default;