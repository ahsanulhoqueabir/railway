import pool from "../config/db.js";
import { generateID } from "../utility/functions.js";

const createTrain = async (req, res) => {
  try {
    const {
      name,
      start_station,
      end_station,
      couch_no,
      departure_time,
      arrival_time,
      train_number,
      off_day,
    } = req.body;
    // Ensure the table exists
    await pool.query(`
        CREATE TABLE IF NOT EXISTS train (
            id VARCHAR(17) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            start_station VARCHAR(255) NOT NULL,
            end_station VARCHAR(255) NOT NULL,
            FOREIGN KEY (start_station) REFERENCES stations(name),
            FOREIGN KEY (end_station) REFERENCES stations(name),
            coach_no INT NOT NULL,
            departure_time TIME NOT NULL,
            arrival_time TIME NOT NULL,
            train_type VARCHAR(255) DEFAULT NULL,
            train_number VARCHAR(255) NOT NULL,
            off_day INT DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);
    const id = generateID();

    // Insert the train
    const train = await pool.query(
      "INSERT INTO train (id, name, start_station, end_station, coach_no, departure_time, arrival_time, train_number, off_day) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        name,
        start_station,
        end_station,
        couch_no,
        departure_time,
        arrival_time,
        train_number,
        off_day,
      ]
    );
    if (train[0].affectedRows === 0) {
      return res.status(500).json({
        message: "Failed to create train",
      });
    }
    const [starts] = await pool.query("SELECT * FROM station WHERE name = ?", [
      start_station,
    ]);
    const [ends] = await pool.query("SELECT * FROM station WHERE name = ?", [
      end_station,
    ]);
    if (starts.length === 0 || ends.length === 0) {
      return res.status(404).json({
        message: "Start or end station not found",
      });
    }
    const idst = generateID();
    const ide = generateID();
    const addToStoppageQuery = `
      INSERT INTO stoppages (id, train_id,station_id, arrival_time, departure_time, halt_time,station_order)
      VALUES (?, ?, ?, ?, ?, ?, ? )
    `;

    await pool.query(addToStoppageQuery, [
      idst,
      id,
      starts[0].id,
      departure_time,
      departure_time,
      0,
      1,
    ]);
    await pool.query(addToStoppageQuery, [
      ide,
      id,
      ends[0].id,
      arrival_time,
      arrival_time,
      0,
      9,
    ]);

    return res.status(201).json({
      message: "Train created successfully",
      train: {
        id,
        name,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all trains
const getAllTrains = async (req, res) => {
  try {
    const trains = await pool.query(
      "SELECT id,name,start_station,end_station,departure_time,arrival_time,train_number  FROM train"
    );
    return res.status(200).json(trains[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTrainById = async (req, res) => {
  try {
    const { id } = req.params;
    const train = await pool.query("SELECT * FROM train WHERE id = ?", [id]);
    if (train[0].length === 0) {
      return res.status(404).json({ message: "Train not found" });
    }
    return res.status(200).json(train[0][0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Update a train by ID
const updateTrainById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      start_station,
      end_station,
      couch_no,
      departure_time,
      arrival_time,
      train_type,
      train_number,
      off_day,
    } = req.body;
    const train = await pool.query(
      "UPDATE train SET name = ?, start_station = ?, end_station = ?, couch_no = ?, departure_time = ?, arrival_time = ?, train_type = ?, train_number = ?, off_day = ? WHERE id = ?",
      [
        name,
        start_station,
        end_station,
        couch_no,
        departure_time,
        arrival_time,
        train_type,
        train_number,
        off_day,
        id,
      ]
    );
    if (train[0].affectedRows === 0) {
      return res.status(404).json({ message: "Train not found" });
    }
    return res.status(200).json({ message: "Train updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Delete a train by ID
const deleteTrainById = async (req, res) => {
  try {
    const { id } = req.params;
    const train = await pool.query("DELETE FROM train WHERE id = ?", [id]);
    if (train[0].affectedRows === 0) {
      return res.status(404).json({ message: "Train not found" });
    }
    return res.status(200).json({ message: "Train deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createTrain,
  getAllTrains,
  getTrainById,
  updateTrainById,
  deleteTrainById,
};
