import userRoutes from "./user.routes";
import productRoutes from "./product.routes"

import { Router } from "express";

const routes = Router();

routes.use("/", userRoutes);
routes.use("/products", productRoutes);

export default routes;
