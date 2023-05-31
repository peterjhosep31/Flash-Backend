import { Router } from "express";
import fileUpload from 'express-fileupload';

import jwtConfiguration from "../config/accessToken/jsonWebToken.js";
import stores from "../controllers/store.controllers.js";

const router = Router();

router.put("/updateStore", jwtConfiguration.validateToken, fileUpload({ useTempFiles: true, tempFileDir: "./uploads" }), stores.putStore);
router.delete("/deleteStore/:code", jwtConfiguration.validateToken, stores.deleteStore);
router.get("/getStoreAdmin", jwtConfiguration.validateToken, stores.getStoreAdmin);
router.get("/getDataStore", jwtConfiguration.validateToken, stores.getDataStore);
router.post("/addStore", jwtConfiguration.validateToken, stores.postStore);
router.get("/consultationStore/:code/:idStore", stores.getStore);
router.get("/consultationStore", stores.getStores);

export default router;