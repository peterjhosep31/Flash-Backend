import express from "express";

import productsRoutes from './products.routes.js';
import authUserRoutes from './auth.routes.js';
import category from "./categorys.routes.js";
import storeRoutes from "./store.routes.js";

const routesExpress = express.Router();

routesExpress.use('/products', productsRoutes);
routesExpress.use('/authUser', authUserRoutes);
routesExpress.use('/stores', storeRoutes);
routesExpress.use('/category', category);

export default routesExpress;