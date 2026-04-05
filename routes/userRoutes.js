import express from "express";
import { getUsers, updateUserRole, updateUserStatus } from "../controllers/userController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// All user routes require Admin privileges
router.use(protect);
router.use(authorize("Admin"));

router.route("/").get(getUsers);
router.route("/:id/role").put(updateUserRole);
router.route("/:id/status").put(updateUserStatus);

export default router;
