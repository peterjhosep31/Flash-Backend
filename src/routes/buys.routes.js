import {Router} from "express";

import jsonWebToken from "../config/accessToken/jsonWebToken.js";

import buys from "../controllers/buy.controllers.js";

const routes = Router();

routes.post("/buy/:idProduct/:price", jsonWebToken.validateToken, buys.addBuy);
routes.get("/buyStoreGrafic", jsonWebToken.validateToken, buys.getStoreGrafic);
routes.get("/buyStore", jsonWebToken.validateToken, buys.getBuysStore);
routes.get("/buyCustomer", jsonWebToken.validateToken, buys.getBuys);
routes.get("/buysI", jsonWebToken.validateToken, buys.buys);

export default routes;