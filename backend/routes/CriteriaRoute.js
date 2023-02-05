import express from "express";
import {
  getCriteria,
  getCriteriaByUuid,
  getCriteriaById,
  createCriteria,
  updateCriteria,
  deleteCriteria,
} from "../controllers/Criteria.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/criteria", verifyUser, getCriteria);
router.get("/criteria/:id", verifyUser, getCriteriaByUuid);
router.get("/criteria-id/:id", verifyUser, getCriteriaById);
router.post("/criteria", verifyUser, createCriteria);
router.patch("/criteria/:id", verifyUser, updateCriteria);
router.delete("/criteria/:id", verifyUser, deleteCriteria);

export default router;
