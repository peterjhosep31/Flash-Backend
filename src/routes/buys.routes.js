import {Router} from "express";

import jsonWebToken from "../config/accessToken/jsonWebToken.js";
import buys from "../controllers/buy.controllers.js"

const routes = Router();

routes.post("/buy/:idProduct", jsonWebToken.validateToken, buys.addBuy);
routes.get("/buyCustomer", jsonWebToken.validateRole, buys.getBuys);
routes.get("/buyStore", jsonWebToken.validateRole, buys.getBuysStore);

export default routes;