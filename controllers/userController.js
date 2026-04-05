import User from "../models/User.js";

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user role
// @route   PUT /api/users/:id/role
// @access  Private/Admin
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    
    if (!["Viewer", "Analyst", "Admin"].includes(role)) {
      res.status(400);
      throw new Error("Invalid role provided");
    }

    const user = await User.findById(req.params.id);

    if (user) {
      if (user.id === req.user.id && role !== "Admin") {
        res.status(400);
        throw new Error("Cannot demote yourself from Admin");
      }
      
      user.role = role;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update user status (active/inactive)
// @route   PUT /api/users/:id/status
// @access  Private/Admin
export const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      res.status(400);
      throw new Error("Invalid status provided");
    }

    const user = await User.findById(req.params.id);

    if (user) {
       if (user.id === req.user.id && status === "inactive") {
        res.status(400);
        throw new Error("Cannot deactivate your own account");
      }

      user.status = status;
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};
