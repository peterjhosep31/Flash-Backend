import { Router } from "express";
import fileUpload from 'express-fileupload';

import jwtConfiguration from "../config/accessToken/jsonWebToken.js";
import stores from "../controllers/store.controllers.js";

const router = Router();

router.delete("/deleteStore/:code", jwtConfiguration.validateToken, stores.deleteStore);
router.get("/getStoreAdmin", jwtConfiguration.validateToken, stores.getStoreAdmin);
router.put("/updateStore", jwtConfiguration.validateToken, fileUpload({
  useTempFiles: true,
  tempFileDir: "./uploads",
}), stores.putStore);
router.post("/addStore", jwtConfiguration.validateToken, stores.postStore);
router.get("/consultationStore/:code/:idStore", stores.getStore);
router.get("/consultationStore", stores.getStores);
router.get("/getDataStore",jwtConfiguration.validateToken, stores.getDataStore);

export default router;