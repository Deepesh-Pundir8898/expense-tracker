import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const user = await userModel.create({ name, email, password });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: `User signup failed: ${error.message}`,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.setHeader("Authorization", `Bearer ${token}`);

    res.status(200).send({
      success: true,
      message: "User Login",
      user: user,
      token: token,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: `User login failed: ${error.message}`,
    });
  }
};
