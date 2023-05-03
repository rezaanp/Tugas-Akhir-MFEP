import express from "express";
import {
  getStudent,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentByNISN,
} from "../controllers/Student.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router
  .route("/student")
  .get(verifyUser, getStudent)
  .post(verifyUser, createStudent);

router
  .route("/student/:id")
  .get(verifyUser, getStudentById)
  .patch(verifyUser, updateStudent)
  .delete(verifyUser, deleteStudent);

router.route("/student/nisn/:id").get(verifyUser, getStudentByNISN);

export default router;
