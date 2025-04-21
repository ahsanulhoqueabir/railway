import express from "express";
import {
  createUser,
  getUser,
  updatePassword,
  deleteUser,
} from "../controller/user.js";

const router = express.Router();

router.post("/registration", createUser);
router.get("/get", getUser);
router.put("/update-password", updatePassword);
router.delete("/delete/:email", deleteUser);

export default router;
