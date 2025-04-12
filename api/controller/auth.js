import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const LogIn = async (req, res) => {
  try {
    const { phmail: email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const [rows] = await pool.execute(
      "SELECT * FROM user WHERE email = ? or phone = ?",
      [email, email]
    );

    if (rows.length === 0) {
      return res.status(204).json({ message: "User not found." });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(204).json({
        data: "Invalid credentials.",
        message: "Invalid credentials.",
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };
    return res
      .status(200)
      .json({ message: `Welcome Back Mr. ${user.name}`, token, userData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { LogIn };
