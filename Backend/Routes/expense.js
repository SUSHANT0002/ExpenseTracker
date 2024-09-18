const express = require("express");
const Expense = require("../Models/Expense");
const authMiddleware = require("../Middleware/authMiddleware");
const router = express.Router();

// Add Expense
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { category, amount, comments } = req.body;

    // Create new expense
    const newExpense = new Expense({
      user: req.user.id,
      category,
      amount,
      comments,
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// View Expenses
router.get("/", authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Edit Expense
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { category, amount, comments } = req.body;
    const expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: "Expense not found" });
    if (expense.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    // Update expense details
    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.comments = comments || expense.comments;

    await expense.save();
    res.json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// Delete Expense
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) return res.status(404).json({ msg: "Expense not found" });
    if (expense.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    await expense.remove();
    res.json({ msg: "Expense removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
