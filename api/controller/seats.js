import pool from "../config/db.js";
import { generateID } from "../utility/functions.js";

const createSeat = async (req, res) => {
  try {
    const { couch_id, seat_number, seat_type } = req.body;
    // Ensure the table exists
    const query = `
            CREATE TABLE IF NOT EXISTS seats (
            seat_id VARCHAR(17) PRIMARY KEY ,
            couch_id VARCHAR(17) NOT NULL,
            seat_number VARCHAR(5),
            seat_type VARCHAR(20),
            seat_index INT,
            is_booked BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (couch_id) REFERENCES couches(id)
            )
        `;
    await pool.query(query);
    const seat_id = generateID();
    // Check if the seat already exists
    const isExists = await pool.query(
      "SELECT * FROM seats WHERE seat_number = ? AND couch_id = ?",
      [seat_number, couch_id]
    );
    if (isExists[0].length > 0) {
      return res.status(409).json({
        message: "Seat with this number already exists in this couch",
      });
    }
    // Insert the seat
    const seat = await pool.query(
      "INSERT INTO seats (seat_id, couch_id, seat_number, seat_type) VALUES (?, ?, ?, ?)",
      [seat_id, couch_id, seat_number, seat_type]
    );
    return res.status(201).json(seat[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all seats
const getAllSeats = async (req, res) => {
  try {
    const seats = await pool.query("SELECT * FROM seats");
    return res.status(200).json(seats[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a seat by ID
const getSeatById = async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await pool.query("SELECT * FROM seats WHERE seat_id = ?", [
      id,
    ]);
    if (seat[0].length === 0) {
      return res.status(404).json({ message: "Seat not found" });
    }
    return res.status(200).json(seat[0][0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a seat
const updateSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { couch_id, seat_number, seat_type } = req.body;
    const seat = await pool.query("SELECT * FROM seats WHERE seat_id = ?", [
      id,
    ]);
    if (seat[0].length === 0) {
      return res.status(404).json({ message: "Seat not found" });
    }
    const query = `
            UPDATE seats
            SET couch_id = ?, seat_number = ?, seat_type = ?
            WHERE seat_id = ?
        `;
    await pool.query(query, [couch_id, seat_number, seat_type, id]);
    return res.status(200).json({ message: "Seat updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a seat
const deleteSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const seat = await pool.query("SELECT * FROM seats WHERE seat_id = ?", [
      id,
    ]);
    if (seat[0].length === 0) {
      return res.status(404).json({ message: "Seat not found" });
    }
    await pool.query("DELETE FROM seats WHERE seat_id = ?", [id]);
    return res.status(200).json({ message: "Seat deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { createSeat, getAllSeats, getSeatById, updateSeat, deleteSeat };
