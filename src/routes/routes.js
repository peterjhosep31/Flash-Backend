import express from "express";

import productsRoutes from './products.routes.js';
import authUserRoutes from './auth.routes.js';
import storeRoutes from "./store.routes.js"
import category from "./categorys.routes.js";

const routesExpress = express.Router();

routesExpress.use('/authUser', authUserRoutes);
routesExpress.use('/stores', storeRoutes);
routesExpress.use('/category', category);
routesExpress.use('/products', productsRoutes);

export default routesExpress;