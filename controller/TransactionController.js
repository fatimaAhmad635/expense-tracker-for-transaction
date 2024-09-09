import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user_id: req.user._id });
    res.status(200).json({ data: transactions });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const { amount, description, type, category_id, date, currency } = req.body;

    const transaction = new Transaction({
      amount,
      description,
      type,
      user_id: req.user._id,
      category_id,
      date,
      currency, // New currency field
    });

    await transaction.save();
    res.status(201).json({ message: "Transaction created successfully", transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, type, category_id, date, currency } = req.body;

    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    transaction.amount = amount;
    transaction.description = description;
    transaction.type = type;
    transaction.category_id = category_id;
    transaction.date = date;
    transaction.currency = currency; // New currency field

    await transaction.save();
    res.status(200).json({ message: "Transaction updated successfully", transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const filter = async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await Transaction.find({ category_id: id, user_id: req.user._id });
    res.status(200).json({ data: transactions });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
