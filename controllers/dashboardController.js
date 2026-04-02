const Record = require("../models/Record");

exports.getSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const records = await Record.find({
      createdBy: userId,
      isDeleted: false,
    });

    let totalIncome = 0;
    let totalExpense = 0;

    records.forEach((record) => {
      if (record.type === "income") {
        totalIncome += record.amount;
      } else {
        totalExpense += record.amount;
      }
    });

    const netBalance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoryTotals = async (req, res) => {
  try {
    const userId = req.user._id;

    const result = await Record.aggregate([
      {
        $match: {
          createdBy: userId,
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecentTransactions = async (req, res) => {
  try {
    const userId = req.user._id;

    const records = await Record.find({
      createdBy: userId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMonthlyTrends = async (req, res) => {
  try {
    const userId = req.user._id;

    const trends = await Record.aggregate([
      {
        $match: {
          createdBy: userId,
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          totalIncome: {
            $sum: {
              $cond: [
                { $eq: ["$type", "income"] },
                "$amount",
                0,
              ],
            },
          },
          totalExpense: {
            $sum: {
              $cond: [
                { $eq: ["$type", "expense"] },
                "$amount",
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $concat: [
              { $toString: "$_id.year" },
              "-",
              {
                $cond: [
                  { $lt: ["$_id.month", 10] },
                  { $concat: ["0", { $toString: "$_id.month" }] },
                  { $toString: "$_id.month" },
                ],
              },
            ],
          },
          totalIncome: 1,
          totalExpense: 1,
        },
      },
    ]);

    res.json(trends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};