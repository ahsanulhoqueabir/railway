import express from "express";
import { LogIn } from "../controller/auth.js";

const router = express.Router();

router.post("/login", LogIn);

export default router;
