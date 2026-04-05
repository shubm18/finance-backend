import express from "express";
import { getDashboardSummary, getRecentActivity } from "../controllers/dashboardController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Dashboard routes can be accessed by any authenticated user (Viewer, Analyst, Admin)
router.use(protect);
router.use(authorize("Viewer", "Analyst", "Admin"));

router.get("/summary", getDashboardSummary);
router.get("/recent-activity", getRecentActivity);

export default router;
