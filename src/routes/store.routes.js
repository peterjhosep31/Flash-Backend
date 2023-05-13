import { Router } from "express";

import stores from "../controllers/store.controllers.js";
import jwtConfiguration from "../config/accessToken/jsonWebToken.js";


const router = Router();

router.get("/consultationStore", stores.getStore);
router.get("/getStoreAdmin", jwtConfiguration.validateToken, stores.getStoreAdmin)
router.post("/addStore", jwtConfiguration.validateToken, stores.postStore);
router.put("/updateStore", jwtConfiguration.validateToken, stores.putStore);
router.delete("/deleteStore", jwtConfiguration.validateToken, stores.deleteStore);

export default router;