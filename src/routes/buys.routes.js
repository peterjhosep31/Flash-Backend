import {Router} from "express";

import jsonWebToken from "../config/accessToken/jsonWebToken.js";
import buys from "../controllers/buy.controllers.js"

const routes = Router();

routes.post("/buy/:idProduct", jsonWebToken.validateToken, buys.addBuy);
routes.get("/buyStore", jsonWebToken.validateToken, buys.getBuysStore);
routes.get("/buyCustomer", jsonWebToken.validateToken, buys.getBuys);

export default routes;