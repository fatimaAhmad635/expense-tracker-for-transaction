import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the transaction schema using the Schema class
const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: [true, "Transaction amount is required"],
    min: [0, "Amount cannot be negative"], // Ensure amount is positive
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Description is required"],
  },
  type: {
    type: String,
    enum: ["expense", "income", "transfer"],
    default: "expense",
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User", // Reference to the 'User' model
    required: true,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "Category", // Reference to the 'Category' model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically sets to the current date
  },
  currency: {
    type: String,
    enum: ["USD", "EUR", "GBP", "PKR", "INR", "JPY"], // Allow only specific currencies
    default: "USD", // Default currency is USD
    required: [true, "Currency is required"],
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

// Add a pre-save hook to validate or manipulate data before saving (optional)
transactionSchema.pre("save", function (next) {
  // Example: You could add extra business logic before saving a transaction
  console.log("A transaction is being saved:", this);
  next();
});

// Static method to find transactions by user ID
transactionSchema.statics.findByUserId = function(user_id) {
  return this.find({ user_id }).populate("category_id").exec();
};

// Create and export the 'Transaction' model using the defined schema
export default mongoose.model("Transaction", transactionSchema);
