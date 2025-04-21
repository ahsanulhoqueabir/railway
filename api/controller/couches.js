import pool from "../config/db.js";
import { generateID } from "../utility/functions.js";
import { genSeats, sleSeats } from "../utility/seatlists.js";

const createcouch = async (req, res) => {
  try {
    const { schedule_id, couch_type, total_seats } = req.body;

    const couch_id = generateID();

    // Ensure the table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS couches (
        id VARCHAR(17) PRIMARY KEY,
        schedule_id VARCHAR(17) NOT NULL,
        couch_type VARCHAR(50) NOT NULL,
        total_seats INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (schedule_id) REFERENCES train_schedule(id)
        )
    `);

    const query = `
      INSERT INTO couches (id, schedule_id, couch_type, total_seats)
      VALUES (?, ?, ?, ?)
    `;

    await pool.query(query, [couch_id, schedule_id, couch_type, total_seats]);

    if (couch_type === "Sleeper") {
      sleSeats.map((seat, ind) => {
        const seat_id = generateID();
        const query = `
          INSERT INTO seats (seat_id, couch_id, seat_number,seat_index, seat_type)
          VALUES (?, ?, ?, ?,?)
        `;
        pool.query(query, [
          seat_id,
          couch_id,
          seat.seat,
          seat.index,
          couch_type,
        ]);
      });
    } else if (couch_type === "Shovon" || couch_type === "Snighdha") {
      genSeats.map((seat, ind) => {
        const seat_id = generateID();
        const query = `
          INSERT INTO seats (seat_id, couch_id, seat_number, seat_index, seat_type)
          VALUES (?, ?, ?, ?,?)
        `;
        pool.query(query, [
          seat_id,
          couch_id,
          seat.seat,
          seat.index,
          couch_type,
        ]);
      });
    }

    return res
      .status(201)
      .json({ message: "couch created successfully", couch_id });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllcouches = async (req, res) => {
  try {
    const couches = await pool.query("SELECT * FROM couches");
    return res.status(200).json(couches[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getcouchById = async (req, res) => {
  try {
    const { id } = req.params;
    const couch = await pool.query("SELECT * FROM couches WHERE id = ?", [id]);
    if (couch[0].length === 0) {
      return res.status(404).json({ message: "couch not found" });
    }
    return res.status(200).json(couch[0][0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updatecouch = async (req, res) => {
  try {
    const { id } = req.params;
    const { schedule_id, couch_type, total_seats } = req.body;
    const couch = await pool.query("SELECT * FROM couches WHERE id = ?", [id]);
    if (couch[0].length === 0) {
      return res.status(404).json({ message: "couch not found" });
    }
    const query = `
            UPDATE couches
            SET schedule_id = ?, couch_type = ?, total_seats = ?
            WHERE id = ?
        `;
    await pool.query(query, [schedule_id, couch_type, total_seats, id]);
    return res.status(200).json({ message: "couch updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deletecouch = async (req, res) => {
  try {
    const { id } = req.params;
    const couch = await pool.query("SELECT * FROM couches WHERE id = ?", [id]);
    if (couch[0].length === 0) {
      return res.status(404).json({ message: "couch not found" });
    }
    await pool.query("DELETE FROM couches WHERE id = ?", [id]);
    return res.status(200).json({ message: "couch deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { createcouch, getAllcouches, getcouchById, updatecouch, deletecouch };
