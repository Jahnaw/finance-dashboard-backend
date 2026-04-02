const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { body } = require("express-validator");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

const recordValidation = [
  body("amount").isNumeric().withMessage("Amount must be a number"),
  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),
  body("category").notEmpty().withMessage("Category is required"),
  body("date").isISO8601().withMessage("Invalid date format"),
];

router.post(
  "/",
  authMiddleware,
  authorize(["admin"]),
  recordValidation,
  createRecord
);

router.get("/", authMiddleware, getRecords);

router.put(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  updateRecord
);

router.delete("/:id", authMiddleware, authorize(["admin"]), deleteRecord);

module.exports = router;