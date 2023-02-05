import express from "express";
import {
  getPunishment,
  getPunishmentById,
  createPunishment,
  updatePunishment,
  deletePunishment,
} from "../controllers/Punishment.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/punishment", verifyUser, getPunishment);
router.get("/punishment/:id", verifyUser, getPunishmentById);
router.post("/punishment", verifyUser, createPunishment);
router.patch("/punishment/:id", verifyUser, updatePunishment);
router.delete("/punishment/:id", verifyUser, deletePunishment);

export default router;
