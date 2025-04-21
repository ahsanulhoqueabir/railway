import express from "express";

import {
  createBookingSeat,
  getAllBookingSeats,
  getBookingSeatById,
  updateBookingSeat,
  deleteBookingSeat,
} from "../controller/bookingseats.js";

const router = express.Router();

router.post("/", createBookingSeat);
router.get("/", getAllBookingSeats);
router.get("/:id", getBookingSeatById);
router.put("/:id", updateBookingSeat);
router.delete("/:id", deleteBookingSeat);

export default router;
