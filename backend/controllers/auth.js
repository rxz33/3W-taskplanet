import User from "../models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json("User not found");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).json("Invalid password");

    res.json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
};