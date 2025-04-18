import express from "express";
import {
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
} from "../controller/stations.js";

const router = express.Router();

router.post("/create", createStation);
router.get("/all", getAllStations);
router.get("/available", getAvailableStations);
router.get("/unavailable", getUnavailableStations);
router.get("/find/:id", getStationById);
router.put("/update/:id", updateStationById);
router.delete("/delete/:id", deleteStationById);
router.get("/mastername/:mastername", getStationsByMasterName);
router.get("/name/:name", getStationsByName);
router.get("/capacity/:capacity", getStationsBystation_code);

export default router;
