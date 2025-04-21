import pool from "../config/db.js";
import { generateID } from "../utility/functions.js";

const createTrainStoppage = async (req, res) => {
  try {
    const {
      trainID,
      stationID,
      arrival_time: arrive,
      departure_time: departure,
      halt_time: halt,
      station_order,
    } = req.body;
    // Ensure the table exists
    await pool.query(`
    CREATE TABLE IF NOT EXISTS stoppages (
        id VARCHAR(17) PRIMARY KEY,
        train_id VARCHAR(17) NOT NULL,
        station_id VARCHAR(17) NOT NULL,
        halt_time INT NOT NULL,
        arrival_time TIME NOT NULL,
        departure_time TIME NOT NULL,
        station_order INT NOT NULL DEFAULT 0,
        FOREIGN KEY (train_id) REFERENCES train(id),
        FOREIGN KEY (station_id) REFERENCES station(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`);

    const id = generateID();
    // Insert the train stoppage
    const trainStoppage = await pool.query(
      "INSERT INTO stoppages (id, train_id, station_id, arrival_time, departure_time, halt_time, station_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, trainID, stationID, arrive, departure, halt, station_order]
    );

    return res.status(201).json(trainStoppage);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTrainStoppages = async (req, res) => {
  try {
    const stoppages = await pool.query("SELECT * FROM stoppages");
    return res.status(200).json(stoppages[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTrainStoppageByID = async (req, res) => {
  try {
    const { stoppageID } = req.params;
    const stoppage = await pool.query("SELECT * FROM stoppages WHERE id = ?", [
      stoppageID,
    ]);
    if (stoppage[0].length === 0) {
      return res.status(404).json({ message: "Stoppage not found" });
    }
    return res.status(200).json(stoppage[0][0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateTrainStoppage = async (req, res) => {
  try {
    const { stoppageID } = req.params;
    const {
      trainID,
      stationID,
      arrival_time: arrive,
      departure_time: departure,
      halt_time: halt,
    } = req.body;
    const stoppage = await pool.query("SELECT * FROM stoppages WHERE id = ?", [
      stoppageID,
    ]);
    if (stoppage[0].length === 0) {
      return res.status(404).json({ message: "Stoppage not found" });
    }
    const updatedStoppage = await pool.query(
      "UPDATE stoppages SET train_id = ?, station_id = ?, arrival_time = ?, departure_time = ?, halt_time = ? WHERE id = ?",
      [trainID, stationID, arrive, departure, halt, stoppageID]
    );
    return res.status(200).json(updatedStoppage[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteTrainStoppage = async (req, res) => {
  try {
    const { stoppageID } = req.params;
    const stoppage = await pool.query("SELECT * FROM stoppages WHERE id = ?", [
      stoppageID,
    ]);
    if (stoppage[0].length === 0) {
      return res.status(404).json({ message: "Stoppage not found" });
    }
    await pool.query("DELETE FROM stoppages WHERE id = ?", [stoppageID]);
    return res.status(200).json({ message: "Stoppage deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTrainStoppagesByTrainID = async (req, res) => {
  try {
    const { trainID } = req.params;
    const stoppages = await pool.query(
      "SELECT * FROM stoppages WHERE train_id = ?",
      [trainID]
    );
    if (stoppages[0].length === 0) {
      return res.status(404).json({ message: "Stoppages not found" });
    }
    const data = [];
    stoppages[0].map((stoppages, ind) => {
      const { id, arrival_time, departure_time, halt_time } = stoppages;
      data.push({
        id,
        arrival_time,
        departure_time,
        halt_time,
      });
    });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTrainStoppagesByStationID = async (req, res) => {
  try {
    const { stationID } = req.params;
    const stoppages = await pool.query(
      "SELECT * FROM stoppages WHERE station_id = ?",
      [stationID]
    );
    if (stoppages[0].length === 0) {
      return res.status(404).json({ message: "Stoppages not found" });
    }
    return res.status(200).json(stoppages[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTrainStoppagesByTrainIDAndStationID = async (req, res) => {
  try {
    const { trainID, stationID } = req.params;
    const stoppages = await pool.query(
      "SELECT * FROM stoppages WHERE train_id = ? AND station_id = ?",
      [trainID, stationID]
    );
    if (stoppages[0].length === 0) {
      return res.status(404).json({ message: "Stoppages not found" });
    }
    return res.status(200).json(stoppages[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export {
  createTrainStoppage,
  getTrainStoppages,
  getTrainStoppageByID,
  updateTrainStoppage,
  deleteTrainStoppage,
  getTrainStoppagesByTrainID,
  getTrainStoppagesByStationID,
  getTrainStoppagesByTrainIDAndStationID,
};
