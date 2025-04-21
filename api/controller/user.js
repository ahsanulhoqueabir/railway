import pool from "../config/db.js";
import { generateID } from "../utility/functions.js";
import hassPassword from "../utility/hasspass.js";

const createUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const hashedPassword = await hassPassword(password);
    // Check if the user already exists
    const existingUser = await pool.query(
      "SELECT * FROM user WHERE email = ? or phone = ?",
      [email, phone]
    );
    if (existingUser[0].length > 0) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    // Ensure the table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user (
        id VARCHAR(17) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        image VARCHAR(255) DEFAULT NULL,
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    const id = generateID();
    // Insert the user
    const user = await pool.query(
      "INSERT INTO user (id,name,phone, email, password) VALUES (?,?,?,?,?)",
      [id, name, phone, email, hashedPassword]
    );

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM user");
    return res.status(200).json(user[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const updatePassword = async (req, res) => {
  try {
    const { password, newPassword, email } = req.body;

    const hashedPassword = await hassPassword(newPassword);
    const user = await pool.query(
      "UPDATE user SET password = ? WHERE email = ?",
      [hashedPassword, email]
    );
    if (user[0].affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await pool.query("DELETE FROM user WHERE email = ?", [email]);
    if (user[0].affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { createUser, getUser, updatePassword, deleteUser };
