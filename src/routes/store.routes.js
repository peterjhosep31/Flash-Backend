import {
  Router
} from "express";

import stores from "../controllers/store.controllers.js";
import jwtConfiguration from "../config/accessToken/jsonWebToken.js";



const router = Router();

router.get("/consultationStore", stores.getStore);
router.post("/addStore", [jwtConfiguration.validateToken, jwtConfiguration.validateRoleAdministrator], stores.postStore);
router.put("/updateStore", [jwtConfiguration.validateToken, jwtConfiguration.validateRoleEmployee], stores.putStore);
router.delete("/deleteStore", [jwtConfiguration.validateToken, jwtConfiguration.validateRoleAdministrator], stores.deleteStore);

export default router;