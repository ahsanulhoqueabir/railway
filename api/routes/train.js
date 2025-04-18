import express from "express";

import {
  createTrain,
  getAllTrains,
  getTrainById,
  updateTrainById,
  deleteTrainById,
} from "../controller/train.js";

const router = express.Router();

router.post("/create", createTrain);
router.get("/all", getAllTrains);
router.get("/find/:id", getTrainById);
router.put("/update/:id", updateTrainById);
router.delete("/delete/:id", deleteTrainById);

export default router;
