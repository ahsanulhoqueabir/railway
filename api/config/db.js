import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const poolConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,  // Adjust based on traffic
  queueLimit: 0,
};

const pool = mysql.createPool(poolConfig).promise();

export default pool;
