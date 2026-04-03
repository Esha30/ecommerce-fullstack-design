import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Comprehensive email regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format. Please provide a proper email." });
    }

    // Domain validation - Ensure it's not a dummy or temporary email
    const disposableDomains = ["mailinator.com", "tempmail.com", "test.com", "example.com", "dummy.com", "foo.com", "bar.com"];
    const domain = email.split("@")[1]?.toLowerCase();
    if (disposableDomains.includes(domain)) {
      return res.status(400).json({ message: "This email domain is not allowed. Please use a real email." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      username,
      email,
      password,
      role: "user", // Role is always 'user' by default for safety
    });
    generateToken(user._id, res);
    await user.save();
    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  const { email: identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  // Find user by either email or username
  const userExists = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!userExists) {
    return res.status(400).json({ message: "User does not exist" });
  }
  const isMatch = await userExists.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: "password incorrect" });
  }
  try {
    generateToken(userExists._id, res);
    res.status(201).json(userExists);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(201).json({ message: "User successfully logged out" });
  } catch (error) {
    res.status(500).json({ massege: "error in logout route" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) {
      return res.status(200).json({ user: null });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id).select("-password");
    if (!user) {
      return res.status(200).json({ user: null });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(200).json({ user: null });
  }
};
