import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: ["First Name field is Required"] },
    lastName: { type: String, required: ["Last Name field is Required"] },
    email: { type: String, required: ["Email field  is Required"] },
    password: { type: String, required: ["Password field  is Required"] },
    categories: [{ label: String, icon: String }],
  },
  { timestamps: true }
);

export default new mongoose.model("User", userSchema);
