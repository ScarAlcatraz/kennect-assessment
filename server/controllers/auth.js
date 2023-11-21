import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userSchema.js";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const isUser = await Users.findOne({ email: email });
    if (isUser) {
      return res.status(400).json({ msg: "User already exist." });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "User Does not exist." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Wrong Password." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.password = undefined;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
