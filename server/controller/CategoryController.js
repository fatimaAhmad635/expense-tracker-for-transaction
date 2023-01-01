import User from "../models/User.js";

// after authenticate the get back json response
export const destory = async(req, res) => {
  const categories = req.user.categories;
  const newCategories = categories.filter((category) => category._id != req.params.id);
  const user=await User.updateOne({ _id: req.user.id }, { $set: { categories: newCategories } });
  res.json({ user });
};
