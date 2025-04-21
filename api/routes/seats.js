import express from "express";

import {
  createSeat,
  getAllSeats,
  getSeatById,
  updateSeat,
  deleteSeat,
} from "../controller/seats.js";

const router = express.Router();

router.post("/", createSeat);
router.get("/", getAllSeats);
router.get("/:id", getSeatById);
router.put("/:id", updateSeat);
router.delete("/:id", deleteSeat);

export default router;
