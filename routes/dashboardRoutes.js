const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getSummary,
  getCategoryTotals,
  getRecentTransactions,
  getMonthlyTrends,
} = require("../controllers/dashboardController");

router.get("/summary", authMiddleware, getSummary);

router.get(
  "/categories",
  authMiddleware,
  authorize(["admin", "analyst"]),
  getCategoryTotals
);

router.get("/recent", authMiddleware, getRecentTransactions);

router.get(
  "/trends",
  authMiddleware,
  authorize(["admin", "analyst"]),
  getMonthlyTrends
);

module.exports = router;