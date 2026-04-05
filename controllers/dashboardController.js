import Record from "../models/Record.js";

// @desc    Get dashboard summary statistics
// @route   GET /api/dashboard/summary
// @access  Private/Viewer, Analyst, Admin
export const getDashboardSummary = async (req, res, next) => {
  try {
    const records = await Record.find({});

    let totalIncome = 0;
    let totalExpenses = 0;
    const categoryTotals = {};

    records.forEach(record => {
      const amount = Number(record.amount) || 0;
      
      if (record.type === "income") {
        totalIncome += amount;
      } else if (record.type === "expense") {
        totalExpenses += amount;
      }

      // Aggregate category totals
      if (!categoryTotals[record.category]) {
        categoryTotals[record.category] = 0;
      }
      categoryTotals[record.category] += amount;
    });

    const netBalance = totalIncome - totalExpenses;

    res.json({
      totalIncome,
      totalExpenses,
      netBalance,
      categoryTotals,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent activity (latest 5 records)
// @route   GET /api/dashboard/recent-activity
// @access  Private/Viewer, Analyst, Admin
export const getRecentActivity = async (req, res, next) => {
  try {
    const records = await Record.find()
      .sort({ date: -1 })
      .limit(5)
      .select('amount type category date');

    res.json(records);
  } catch (error) {
    next(error);
  }
};
