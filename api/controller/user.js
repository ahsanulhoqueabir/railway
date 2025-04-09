import pool from "../config/db.js";
import { generateID } from "../utility/functions.js";
import hassPassword from "../utility/hasspass.js";

const createUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;
    const hashedPassword = await hassPassword(password);
    // Check if the user already exists
    const existingUser = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
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

export { createUser, getUser };
