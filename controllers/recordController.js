const Record = require("../models/Record");
const { validationResult } = require("express-validator");

exports.createRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, type, category, date, notes } = req.body;

    const record = await Record.create({
      amount,
      type,
      category,
      date,
      notes,
      createdBy: req.user._id,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecords = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category } = req.query;

    const query = {
      isDeleted: false,
      createdBy: req.user._id,
    };

    if (type) query.type = type;
    if (category) query.category = category;

    const records = await Record.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record || record.isDeleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (
      record.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(record, req.body);

    await record.save();

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record || record.isDeleted) {
      return res.status(404).json({ message: "Record not found" });
    }

    if (
      record.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    record.isDeleted = true;
    await record.save();

    res.json({ message: "Record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};