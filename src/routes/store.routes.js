import { Router } from "express";

import stores from "../controllers/store.controllers.js";
import jwtConfiguration from "../config/accessToken/jsonWebToken.js";


const router = Router();

router.get("/consultationStore", stores.getStore);
router.post("/addStore", jwtConfiguration.validateToken, stores.postStore);

// routesExpress.put("/putStore", store.putStore);
// routesExpress.delete("/deleteStore", store.deleteStore);

export default router;