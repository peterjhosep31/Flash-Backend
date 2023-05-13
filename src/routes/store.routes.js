import { Router } from "express";

import jwtConfiguration from "../config/accessToken/jsonWebToken.js";
import stores from "../controllers/store.controllers.js";

const router = Router();

router.delete("/deleteStore/:code", jwtConfiguration.validateToken, stores.deleteStore);
router.get("/getStoreAdmin", jwtConfiguration.validateToken, stores.getStoreAdmin);
router.put("/updateStore", jwtConfiguration.validateToken, stores.putStore);
router.post("/addStore", jwtConfiguration.validateToken, stores.postStore);
router.get("/consultationStore", stores.getStore);

export default router;