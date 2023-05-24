import { Router } from "express";

import valideToken from "../config/accessToken/jsonWebToken.js";
import card from "../controllers/cardShopping.controllers.js";

const rutes = Router();

rutes.post("/addCard/:idProduct", valideToken.validateToken, card.postShopping);
rutes.get("/getCard", valideToken.validateToken, card.getShopping);
rutes.delete("/deleteCard/:idProduct", valideToken.validateToken, card.deleteShopping);
rutes.put("/updateCard/:idProduct", valideToken.validateToken, card.updateShopping);

export default rutes;