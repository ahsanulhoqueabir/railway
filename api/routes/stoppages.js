import express from "express";

import {
  createTrainStoppage,
  getTrainStoppages,
  getTrainStoppageByID,
  updateTrainStoppage,
  deleteTrainStoppage,
  getTrainStoppagesByTrainID,
  getTrainStoppagesByStationID,
  getTrainStoppagesByTrainIDAndStationID,
} from "../controller/trainstoppages.js";

const router = express.Router();

router.post("/add", createTrainStoppage);
router.get("/", getTrainStoppages);
router.get("/:id", getTrainStoppageByID);
router.put("/update/:id", updateTrainStoppage);
router.delete("/delete/:id", deleteTrainStoppage);
router.get("/train/:trainID", getTrainStoppagesByTrainID);
router.get("/station/:stationID", getTrainStoppagesByStationID);
router.get(
  "/train/:trainID/station/:stationID",
  getTrainStoppagesByTrainIDAndStationID
);

export default router;
