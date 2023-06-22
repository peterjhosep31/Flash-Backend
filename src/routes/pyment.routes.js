import { Router } from "express";

import jsonWebToken from "../config/accessToken/jsonWebToken.js";
import payment from "../controllers/payment.controllers.js";

const routes = Router();

// routes.post("/payment", payment);
routes.post("/paymentCart/:price", jsonWebToken.validateToken, payment.paymenteCart);


export default routes;