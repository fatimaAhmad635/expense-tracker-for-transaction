import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

// Register function
export const register=async (req, res) => {
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
  
    // store user
    const user = await User({ email, password: hashedPassword, firstName, lastName });
    await user.save();
    res.status(201).json({ message: "user created" });
  }

// login  function 
export const login=async (req, res) => {
    const { email, password } = req.body;
  
    //   User exist or not
    const user = await User.findOne({ email });
    if (!user) {
      res.status(406).json({ message: "Credentials Not Found" });
      return;
    }
  
    // check whether password matched or not
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(406).json({ message: "Credentials Not Found" });
      return;
    }
  
    // created jwt token using payload
    const payload={
      username:email,
      _id:user._id
    }
    const token=jwt.sign(payload,process.env.JWT_SECRET)

    
    res.json({message:"successfully logged in",token,user})
  }