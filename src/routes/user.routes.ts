import { Router } from "express";
import { getUsers, addUser, login } from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";
const router = Router();

router.post("/register", addUser);
router.post("/login", login);
router.get("/get-users", auth, getUsers);

export default router;
