import pool from "../config/db.js";

import { generateID } from "../utility/functions.js";

const createStation = async (req, res) => {
  try {
    const { name, longitude, latitude, station_code, mastername } = req.body;
    // Ensure the table exists
    await pool.query(`
        CREATE TABLE IF NOT EXISTS station (
            id VARCHAR(17) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            longitude NUMERIC(10,7) NOT NULL,
            latitude NUMERIC(10,7) NOT NULL,
            station_code VARCHAR(10) UNIQUE NOT NULL,
            is_available BOOLEAN DEFAULT TRUE,
            image VARCHAR(255) DEFAULT NULL,
            station_master_name VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);
    const id = generateID();

    const isExists = await pool.query(
      "SELECT * FROM station WHERE name = ? OR station_code = ?",
      [name, station_code]
    );
    if (isExists[0].length > 0) {
      return res.status(409).json({
        message: "Station with this name or station code already exists",
      });
    }
    // Insert the station
    const station = await pool.query(
      "INSERT INTO station (id, name, longitude, latitude, station_code,station_master_name) VALUES (?, ?, ?, ?, ?, ?)",
      [id, name, longitude, latitude, station_code, mastername]
    );

    return res.status(201).json(station);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all stations
const getAllStations = async (req, res) => {
  try {
    const stations = await pool.query("SELECT * FROM station");
    return res.status(200).json(stations[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Get a station by ID
const getStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await pool.query("SELECT * FROM station WHERE id = ?", [
      id,
    ]);
    if (station[0].length === 0) {
      return res.status(404).json({ message: "Station not found" });
    }
    return res.status(200).json(station[0][0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Update a station by ID
const updateStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, longitude, latitude, station_code, mastername } = req.body;
    const station = await pool.query(
      "UPDATE station SET name = ?, longitude = ?, latitude = ?, station_code = ?, station_master_name = ? WHERE id = ?",
      [name, longitude, latitude, station_code, mastername, id]
    );
    if (station[0].affectedRows === 0) {
      return res.status(404).json({ message: "Station not found" });
    }
    return res.status(200).json({ message: "Station updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Delete a station by ID
const deleteStationById = async (req, res) => {
  try {
    const { id } = req.params;
    const station = await pool.query("DELETE FROM station WHERE id = ?", [id]);
    if (station[0].affectedRows === 0) {
      return res.status(404).json({ message: "Station not found" });
    }
    return res.status(200).json({ message: "Station deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Get all available stations
const getAvailableStations = async (req, res) => {
  try {
    const stations = await pool.query(
      "SELECT * FROM station WHERE is_available = TRUE"
    );
    return res.status(200).json(stations[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Get all unavailable stations
const getUnavailableStations = async (req, res) => {
  try {
    const stations = await pool.query(
      "SELECT * FROM station WHERE is_available = FALSE"
    );
    return res.status(200).json(stations[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Get all stations with a specific master name

const getStationsByMasterName = async (req, res) => {
  try {
    const { mastername } = req.params;
    const stations = await pool.query(
      "SELECT * FROM station WHERE station_master_name = ?",
      [mastername]
    );
    if (stations[0].length === 0) {
      return res.status(404).json({ message: "No stations found" });
    }
    return res.status(200).json(stations[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Get all stations with a specific name
const getStationsByName = async (req, res) => {
  try {
    const { name } = req.params;
    const stations = await pool.query("SELECT * FROM station WHERE name = ?", [
      name,
    ]);
    if (stations[0].length === 0) {
      return res.status(404).json({ message: "No stations found" });
    }
    return res.status(200).json(stations[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
// Get all stations with a specific station_code
const getStationsBystation_code = async (req, res) => {
  try {
    const { station_code } = req.params;
    const stations = await pool.query(
      "SELECT * FROM station WHERE station_code = ?",
      [station_code]
    );
    if (stations[0].length === 0) {
      return res.status(404).json({ message: "No stations found" });
    }
    return res.status(200).json(stations[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export {
  createStation,
  getAllStations,
  getStationById,
  updateStationById,
  deleteStationById,
  getAvailableStations,
  getUnavailableStations,
  getStationsByMasterName,
  getStationsByName,
  getStationsBystation_code,
};
