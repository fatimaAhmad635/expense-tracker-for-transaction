import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
const router = Router();

router.post("/register", async (req, res) => {
  // get all form data
  const { email, password, firstName, lastName } = req.body;

  // check if user exist or not
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "User already exists." });
    return;
  }

  // hash the password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  console.log(hashedPassword);

  const user = await User({ email, password: hashedPassword, firstName, lastName });
  // store user
  await user.save();
  res.status(201).json({ message: "user created" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //   User exist or not
  const userExists = await User.findOne({ email });
  if (!userExists) {
    res.status(406).json({ message: "Credentials Not Found" });
    return;
  }

  // check whether password is or not
  const matched = await bcrypt.compare(password, userExists.password);
  if (!matched) {
    res.status(406).json({ message: "Credentials Not Found" });
    return;
  }

  // create jwt token
  const payload={
    username:email,
    _id:userExists._id
  }
  const token=jwt.sign(payload,process.env.JWT_SECRET)
  console.log(token);
  res.json({message:"successfully logged in",token})
});
export default router;
