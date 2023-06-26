import { Router } from "express";

import jsonWebToken from "../config/accessToken/jsonWebToken.js";
import payment from "../controllers/payment.controllers.js";

const routes = Router();

// routes.post("/payment", payment);
routes.post("/paymentCart/:price", jsonWebToken.validateToken, payment.paymenteCart);
routes.post("/paymentBuy/:product", jsonWebToken.validateToken, payment.paimentDirect);


export default routes;