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
router.put("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const { category, amount, comments } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { category, amount, comments },
      { new: true } // This option returns the updated document
    );

    if (!updatedExpense)
      return res.status(404).json({ msg: "Expense not found" });

    res.json(updatedExpense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//delete expense
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense)
      return res.status(404).json({ msg: "Expense not found" });

    res.json({ msg: "Expense deleted", deletedExpense });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
