import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.js";
import jwtRouter from "./routes/jwt.js";
import cors from "cors";

dotenv.config();

const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json());

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});
app.use("/", router);
app.use("/api/v1/auth", jwtRouter);
app.use("/api/v1/user", userRouter);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
