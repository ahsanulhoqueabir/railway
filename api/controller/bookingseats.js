import pool from "../config/db.js";
import { generateID } from "../utility/functions.js";

const createBookingSeat = async (req, res) => {
  try {
    const { booking_id, seat_id } = req.body;

    const booking_seat_id = generateID();

    // Ensure the table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS booking_seats (
        booking_seat_id VARCHAR(17) PRIMARY KEY,
        booking_id VARCHAR(17) NOT NULL,
        seat_id VARCHAR(17) NOT NULL,
        FOREIGN KEY (booking_id) REFERENCES bookings(booking_id),
        FOREIGN KEY (seat_id) REFERENCES seats(seat_id)
      )
    `);

    // Check if the booking seat already exists
    const isExists = await pool.query(
      "SELECT * FROM booking_seats WHERE booking_id = ? AND seat_id = ?",
      [booking_id, seat_id]
    );
    if (isExists[0].length > 0) {
      return res.status(409).json({
        message: "Booking seat already exists for this booking and seat",
      });
    }

    const query = `
      INSERT INTO booking_seats (booking_seat_id, booking_id, seat_id)
      VALUES (?, ?, ?)
    `;

    await pool.query(query, [booking_seat_id, booking_id, seat_id]);

    return res
      .status(201)
      .json({ message: "Booking seat created successfully", booking_seat_id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllBookingSeats = async (req, res) => {
  try {
    const bookingSeats = await pool.query("SELECT * FROM booking_seats");
    return res.status(200).json(bookingSeats[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getBookingSeatById = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingSeat = await pool.query(
      "SELECT * FROM booking_seats WHERE booking_seat_id = ?",
      [id]
    );
    if (bookingSeat[0].length === 0) {
      return res.status(404).json({ message: "Booking seat not found" });
    }
    return res.status(200).json(bookingSeat[0][0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateBookingSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { booking_id, seat_id } = req.body;
    const bookingSeat = await pool.query(
      "SELECT * FROM booking_seats WHERE booking_seat_id = ?",
      [id]
    );
    if (bookingSeat[0].length === 0) {
      return res.status(404).json({ message: "Booking seat not found" });
    }
    const query = `
            UPDATE booking_seats
            SET booking_id = ?, seat_id = ?
            WHERE booking_seat_id = ?
        `;
    await pool.query(query, [booking_id, seat_id, id]);
    return res
      .status(200)
      .json({ message: "Booking seat updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteBookingSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const bookingSeat = await pool.query(
      "SELECT * FROM booking_seats WHERE booking_seat_id = ?",
      [id]
    );
    if (bookingSeat[0].length === 0) {
      return res.status(404).json({ message: "Booking seat not found" });
    }
    const query = `
            DELETE FROM booking_seats
            WHERE booking_seat_id = ?
        `;
    await pool.query(query, [id]);
    return res
      .status(200)
      .json({ message: "Booking seat deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createBookingSeat,
  getAllBookingSeats,
  getBookingSeatById,
  updateBookingSeat,
  deleteBookingSeat,
};
