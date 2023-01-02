import Transaction from "../models/Transaction.js ";

// sending json response to /transaction  when http GET request to given URL
export const index = async (req, res) => {
  const transaction = await Transaction.find({ user_id: req.user._id }).sort({ createdAt: -1 });
  const demo = await Transaction.aggregate([
    {
      $match: { user_id: req.user._id },
    },
    {
      $group: {
        _id: { $month: "$date" },
        transactions: { $push: { amount: "$amount", description: "$description", date: "$date" } },
        totalExpenses:{$sum:"$amount"},
      },
    },
  ]);
  res.json({ data: demo });
};

// create transaction using /transaction url
export const create = async (req, res) => {
  const { amount, description, date, category_id } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
    user_id: req.user._id,
    category_id,
  });
  // transaction save in mongoDB
  await transaction.save();
  res.json({ message: "Success" });
};

// Delete transaction using /transaction/:id
export const destroy = async (req, res) => {
  await Transaction.findOneAndDelete({ _id: req.params.id });
  res.json({ message: "Deleted" });
};

// Update transaction using /transaction/:id
export const update = async (req, res) => {
  await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
  res.json({ message: "Updated" });
};
