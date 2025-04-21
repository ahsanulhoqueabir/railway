import pool from "../config/db.js";
import { generateID } from "../utility/functions.js";
import { scheduleTable } from "../utility/seatlists.js";

const CreateTrainSchedule = async (req, res) => {
  try {
    const { train_id, date } = req.body;
    const today = new Date().toISOString().split("T")[0];
    // Ensure the table exists
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS train_schedule (
      id VARCHAR(17) PRIMARY KEY,
      train_id VARCHAR(17) NOT NULL,
      date DATE NOT NULL DEFAULT ?,
      arrival_time TIME NOT NULL,
      departure_time TIME NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (train_id) REFERENCES train(id)
      )`,
      [today]
    );
    const id = generateID();
    // Check if the train schedule already exists
    const isExists = await pool.query(
      "SELECT * FROM train_schedule WHERE train_id = ? AND date = ?",
      [train_id, date]
    );
    if (isExists[0].length > 0) {
      return res.status(409).json({
        message: "Train schedule for this train and station already exists",
      });
    }
    // Check if the train exists
    const trainExists = await pool.query("SELECT * FROM train WHERE id = ?", [
      train_id,
    ]);
    if (trainExists[0].length === 0) {
      return res.status(404).json({
        message: "Train not found",
      });
    }
    const { arrival_time, departure_time } = trainExists[0][0];

    // Insert the train schedule
    const trainSchedule = await pool.query(
      "INSERT INTO train_schedule (id, train_id, date, arrival_time, departure_time) VALUES (?, ?, ?, ?, ?)",
      [id, train_id, date, arrival_time, departure_time]
    );
    if (trainSchedule[0].affectedRows === 0) {
      return res.status(500).json({
        message: "Failed to create train schedule",
      });
    }

    return res.status(201).json(trainSchedule[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const CreateFullTrainSchedule = async (req, res) => {
  try {
    const { train_id, date } = req.body;
    const today = new Date().toISOString().split("T")[0];
    // Ensure the table exists
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS train_schedule (
      id VARCHAR(17) PRIMARY KEY,
      train_id VARCHAR(17) NOT NULL,
      date DATE NOT NULL DEFAULT ?,
      arrival_time TIME NOT NULL,
      departure_time TIME NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (train_id) REFERENCES train(id)
      )`,
      [today]
    );
    const id = generateID();
    // Check if the train schedule already exists
    const isExists = await pool.query(
      "SELECT * FROM train_schedule WHERE train_id = ? AND date = ?",
      [train_id, date]
    );
    if (isExists[0].length > 0) {
      return res.status(409).json({
        message: "Train schedule for this train and station already exists",
      });
    }
    // Check if the train exists
    const trainExists = await pool.query("SELECT * FROM train WHERE id = ?", [
      train_id,
    ]);
    if (trainExists[0].length === 0) {
      return res.status(404).json({
        message: "Train not found",
      });
    }
    const { arrival_time, departure_time } = trainExists[0][0];

    // Insert the train schedule
    const trainSchedule = await pool.query(
      "INSERT INTO train_schedule (id, train_id, date, arrival_time, departure_time) VALUES (?, ?, ?, ?, ?)",
      [id, train_id, date, arrival_time, departure_time]
    );
    if (trainSchedule[0].affectedRows === 0) {
      return res.status(500).json({
        message: "Failed to create train schedule",
      });
    }
    scheduleTable.map(async (schedule) => {
      const { type, seats, seatList } = schedule;
      let couches = schedule.couches;

      while (couches > 0) {
        const couch_id = generateID();

        const query = `
      INSERT INTO couches (id, schedule_id, couch_type, total_seats)
      VALUES (?, ?, ?, ?)
      `;

        await pool.query(query, [couch_id, id, type, seats]);
        seatList.map(async (seat) => {
          const seat_id = generateID();
          const query = `
          INSERT INTO seats (seat_id, couch_id, seat_number, seat_index, seat_type)
          VALUES (?, ?, ?, ?,?)
        `;
          await pool.query(query, [
            seat_id,
            couch_id,
            seat.seat,
            seat.index,
            type,
          ]);
        });
        couches--;
      }
    });
    return res.status(201).json(trainSchedule[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const SearchTrainSchedule = async (req, res) => {
  try {
    const { from, to, doj, type } = req.query;

    if (!from || !to || !doj) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const searchStationIDQuery = `
      SELECT id
      FROM station s
      WHERE s.name = ? 
      `;

    const [fs] = await pool.query(searchStationIDQuery, [from]);
    const [ts] = await pool.query(searchStationIDQuery, [to]);

    const TrainIDquery = `
      SELECT s1.train_id
      FROM stoppages s1
      JOIN stoppages s2 
        ON s1.train_id = s2.train_id
      WHERE s1.station_id = ?
        AND s2.station_id = ?
        AND s1.station_order < s2.station_order
`;

    if (type) {
      query += " AND t.type = ?";
      params.push(type);
    }
    const [schedules] = await pool.query(TrainIDquery, [fs[0].id, ts[0].id]);
    if (schedules.length === 0) {
      return res.status(404).json({ message: "No train schedules found" });
    }
    const couchQuery = `
    SELECT
        t.id,
        t.name,
        ts.id,
        ts.date,
        c.id,
        c.couch_type,
        COUNT(s.seat_id) AS total_seats,
        SUM(CASE WHEN s.is_booked = TRUE THEN 1 ELSE 0 END) AS booked_seats,
        SUM(CASE WHEN s.is_booked = FALSE THEN 1 ELSE 0 END) AS available_seats

    FROM train_schedule ts
    JOIN train t ON ts.train_id = t.id
    JOIN couches c ON ts.id = c.schedule_id
    JOIN seats s ON c.id = s.couch_id
    WHERE
      ts.train_id = (?) AND
      ts.date = '2025-04-21'
    GROUP BY
        t.id, ts.id, c.id, c.couch_type
    ORDER BY
        t.name, c.id;

    `;
    const data = await Promise.all(
      schedules.map(async (schedule) => {
        const [rows] = await pool.query(couchQuery, [schedule.train_id]);
        const [trainInfo] = await pool.query(
          `SELECT * FROM train WHERE id = ?`,
          [schedule.train_id]
        );
        const sleeper = [];
        const shovon = [];
        const snighdha = [];
        await Promise.all(
          rows.map(async (ch) => {
            const seats = await pool.query(
              `SELECT * FROM seats WHERE couch_id = ? ORDER BY seat_index`,
              [ch.id]
            );
            const seatspc = seats[0];

            if (ch.couch_type === "Sleeper" || ch.couch_type === "Sleeper AC") {
              sleeper.push({
                ...ch,
                seatspc,
              });
            }
            if (ch.couch_type === "Shovon" || ch.couch_type === "Shovon AC") {
              shovon.push({
                ...ch,
                seatspc,
              });
            }
            if (
              ch.couch_type === "Snigdha" ||
              ch.couch_type === "Snighdha AC"
            ) {
              snighdha.push({
                ...ch,
                seats: seatspc,
              });
            }
          })
        );

        const available_seats_sleeper = sleeper.reduce((sum, item) => {
          return sum + parseInt(item.available_seats, 10);
        }, 0);
        const available_seats_shovon = shovon.reduce((sum, item) => {
          return sum + parseInt(item.available_seats, 10);
        }, 0);
        const available_seats_snighdha = snighdha.reduce((sum, item) => {
          return sum + parseInt(item.available_seats, 10);
        }, 0);
        return {
          train: trainInfo[0],
          date: schedule.date,
          sleeper: {
            details: sleeper,
            available_seats: available_seats_sleeper,
          },
          shovon: {
            details: shovon,
            available_seats: available_seats_shovon,
          },
          snigdha: {
            details: snighdha,
            available_seats: available_seats_snighdha,
          },
        };
      })
    );

    if (data.length === 0) {
      return res.status(404).json({ message: "No train schedules found" });
    }
    return res.status(200).json({
      message: "Train schedules found",
      trains: data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export { CreateTrainSchedule, CreateFullTrainSchedule, SearchTrainSchedule };
