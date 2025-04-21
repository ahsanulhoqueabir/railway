import express from "express";

import {
  createcouch,
  getAllcouches,
  getcouchById,
  updatecouch,
  deletecouch,
} from "../controller/couches.js";

const router = express.Router();

router.post("/new", createcouch);
router.get("/", getAllcouches);
router.get("/:id", getcouchById);
router.put("/update/:id", updatecouch);
router.delete("/delete/:id", deletecouch);

export default router;
