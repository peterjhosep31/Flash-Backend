import express from "express";
import session from "../controllers/session.js";

const routesExpress = express.Router();

    // Rutas de la aplicación, seccions
    routesExpress.post("/registre", session.registre);
    routesExpress.post("/login", session.login);


export default routesExpress;
