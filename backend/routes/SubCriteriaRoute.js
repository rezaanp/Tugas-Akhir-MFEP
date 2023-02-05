import express from "express";
import {
  getSubCriteria,
  getSubCriteriaById,
  getSubCriteriaByCriteria,
  createSubCriteria,
  updateSubCriteria,
  deleteSubCriteria,
} from "../controllers/SubCriteria.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/sub-criteria", verifyUser, getSubCriteria);
router.get("/sub-criteria/:id", verifyUser, getSubCriteriaById);
router.get("/get-criteria/:id", verifyUser, getSubCriteriaByCriteria);
router.post("/sub-criteria", verifyUser, createSubCriteria);
router.patch("/sub-criteria/:id", verifyUser, updateSubCriteria);
router.delete("/sub-criteria/:id", verifyUser, deleteSubCriteria);

export default router;
