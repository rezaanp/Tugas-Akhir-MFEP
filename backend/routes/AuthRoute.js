import express from "express";
import { login, me, logOut } from "../controllers/Auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", me);
router.delete("/logout", logOut);

export default router;
