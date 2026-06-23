const User = require("../models/User");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password -refreshToken");

    res.status(200).json({
      success: true,
      users
    });

  } catch(error){
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      user
    });

  } catch(error){
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (req.user.id === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete own account"
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });

  } catch(error){
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser
};