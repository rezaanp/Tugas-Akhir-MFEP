import express from "express";
import {
  getAccount,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/Account.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/account", verifyUser, getAccount);
router.get("/account/:id", verifyUser, getAccountById);
router.post("/account", createAccount);
router.patch("/account/:id", verifyUser, updateAccount);
router.delete("/account/:id", verifyUser, deleteAccount);

export default router;
