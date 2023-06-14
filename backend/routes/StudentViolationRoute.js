import express from "express";
import {
  getLatestViolation,
  getShouldUpdated,
  getStudentViolationById,
  getDetailAllViolationByStudentId,
  getViolationByReported,
  createStudentViolation,
  updateStudentViolation,
  deleteStudentViolation,
} from "../controllers/StudentViolation/index.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/latest-violation", verifyUser, getLatestViolation);
router.get("/should-updated", verifyUser, getShouldUpdated);
router.get("/student-violation/:id", verifyUser, getStudentViolationById);
router.get("/all-violation/:id", verifyUser, getDetailAllViolationByStudentId);
router.post("/student-violation", verifyUser, createStudentViolation);
router.patch("/student-violation/:id", verifyUser, updateStudentViolation);
router.delete("/student-violation/:id", verifyUser, deleteStudentViolation);
router.get("/violation-reported", verifyUser, getViolationByReported);

export default router;
