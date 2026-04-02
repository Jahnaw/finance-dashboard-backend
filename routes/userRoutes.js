const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { updateUserStatus } = require("../controllers/userController");

router.patch(
  "/:id/status",
  authMiddleware,
  authorize(["admin"]),
  updateUserStatus
);

module.exports = router;