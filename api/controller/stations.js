import pool from "../config/db.js";

import { generateID } from "../utility/functions.js";

const createStation = async (req, res) => {
  try {
    const { name, longitude, latitude, capacity, mastername } = req.body;
    // Ensure the table exists
    await pool.query(`
        CREATE TABLE IF NOT EXISTS station (
            id VARCHAR(17) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            longitude FLOAT NOT NULL,
            latitude FLOAT NOT NULL,
            capacity INT NOT NULL,
            is_available BOOLEAN DEFAULT TRUE,
            image VARCHAR(255) DEFAULT NULL,
            station_master_name VARCHAR(255) DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);
    const id = generateID();
    // Insert the station
    const station = await pool.query(
      "INSERT INTO station (id, name, longitude, latitude, capacity,station_master_name) VALUES (?, ?, ?, ?, ?, ?)",
      [id, name, longitude, latitude, capacity, mastername]
    );

    return res.status(201).json(station);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { createStation };
