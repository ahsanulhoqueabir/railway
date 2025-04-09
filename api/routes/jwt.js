import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const router = express.Router();

router.post("/jwt", (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
  res.send({ token });
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

// module.exports = router;
export default router;
