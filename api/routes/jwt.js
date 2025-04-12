import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import pool from "../config/db.js";

const router = express.Router();

router.post("/jwt", (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  res.send({ token });
});
router.post("/verify", async (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    const id = user.id;
    const [rows] = await pool.execute("SELECT * FROM user WHERE id = ?", [id]);
    const data = {
      id: rows[0].id,
      name: rows[0].name,
      email: rows[0].email,
      phone: rows[0].phone,
    };

    res.send(data);
  });
});
router.get("/generate-signature", async (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const apiSecret = "8uWiHz3yd4IC967tc6Ym4BLg6jU";
  const paramsToSign = `timestamp=${timestamp}`;
  const result = crypto
    .createHash("sha1")
    .update(paramsToSign + apiSecret)
    .digest("hex");
  res.send({ signature: result, timestamp });
});

export default router;
