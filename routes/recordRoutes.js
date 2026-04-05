import express from "express";
import {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} from "../controllers/recordController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// All record routes require authentication
router.use(protect);

router
  .route("/")
  .get(authorize("Analyst", "Admin"), getRecords)
  .post(authorize("Admin"), createRecord);

router
  .route("/:id")
  .get(authorize("Analyst", "Admin"), getRecordById)
  .put(authorize("Admin"), updateRecord)
  .delete(authorize("Admin"), deleteRecord);

export default router;
