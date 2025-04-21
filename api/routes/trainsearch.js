import express from "express";

import { SearchTrainSchedule } from "../controller/trainSchedule.js";

const router = express.Router();

router.get("/train", SearchTrainSchedule);

export default router;
