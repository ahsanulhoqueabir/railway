import express from "express";

import {
  CreateTrainSchedule,
  CreateFullTrainSchedule,
} from "../controller/trainSchedule.js";

const router = express.Router();

router.post("/new", CreateTrainSchedule);
router.post("/fullschedule", CreateFullTrainSchedule);

export default router;
