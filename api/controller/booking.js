import pool from "../config/db.js";
import { generateID } from "../utility/functions.js";

const createBooking = async (req, res) => {
  try {
    const { user_id, schedule_id, booking_time, status } = req.body;

    const booking_id = generateID();

    // Ensure the table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        booking_id VARCHAR(17) PRIMARY KEY,
        user_id VARCHAR(17) NOT NULL,
        schedule_id VARCHAR(17) NOT NULL,
        booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'pending',
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (schedule_id) REFERENCES train_schedule(id)
        )
    `);

    // Check if the booking already exists
    const isExists = await pool.query(
      "SELECT * FROM bookings WHERE user_id = ? AND schedule_id = ?",
      [user_id, schedule_id]
    );
    if (isExists[0].length > 0) {
      return res.status(409).json({
        message: "Booking for this user and schedule already exists",
      });
    }

    // Check if the user exists
    const userExists = await pool.query("SELECT * FROM users WHERE id = ?", [
      user_id,
    ]);
    if (userExists[0].length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const query = `
      INSERT INTO bookings (booking_id, user_id, schedule_id, booking_time, status)
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [booking_id, user_id, schedule_id, booking_time, status];

    await pool.query(query, values);

    return res
      .status(201)
      .json({ message: "Booking created successfully", booking_id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await pool.query("SELECT * FROM bookings");
    return res.status(200).json(bookings[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await pool.query(
      "SELECT * FROM bookings WHERE booking_id = ?",
      [id]
    );
    if (booking[0].length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    return res.status(200).json(booking[0][0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, schedule_id, booking_time, status } = req.body;
    const booking = await pool.query(
      "SELECT * FROM bookings WHERE booking_id = ?",
      [id]
    );
    if (booking[0].length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const query = `
            UPDATE bookings
            SET user_id = ?, schedule_id = ?, booking_time = ?, status = ?
            WHERE booking_id = ?
        `;
    await pool.query(query, [user_id, schedule_id, booking_time, status, id]);
    return res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await pool.query(
      "SELECT * FROM bookings WHERE booking_id = ?",
      [id]
    );
    if (booking[0].length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }
    await pool.query("DELETE FROM bookings WHERE booking_id = ?", [id]);
    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
