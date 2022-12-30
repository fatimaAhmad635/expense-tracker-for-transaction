import Transaction from "../models/Transaction.js ";


// sending json response to /transaction  when http GET request to given URL
export const index=async (req, res) => {
    const transaction = await Transaction.find({}).sort({ createdAt: -1 });
    res.json({ data: transaction });
  }

// create transaction using /transaction url
export const create=async (req, res) => {
    const { amount, description, date } = req.body;
    const transaction = new Transaction({
      amount,
      description,
      date,
    });
    // transaction save in mongoDB
    await transaction.save();
    res.json({ message: "Success" });
  }

// Delete transaction using /transaction/:id
export const destroy=async (req, res) => {
    await Transaction.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Deleted" });
  }

// Update transaction using /transaction/:id
export const update=async (req, res) => {
    await Transaction.updateOne({ _id: req.params.id }, { $set: req.body });
    res.json({ message: "Updated" });
  }