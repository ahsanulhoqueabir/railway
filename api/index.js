import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.js";
import jwtRouter from "./routes/jwt.js";
import authRouer from "./routes/auth.js";
import stationRouter from "./routes/station.js";
import trainRouter from "./routes/train.js";
import trainStoppageRouter from "./routes/stoppages.js";
import trainScheduleRouter from "./routes/trainschedule.js";
import bookingRouter from "./routes/booking.js";
import bookingSeatsRouter from "./routes/bookingseats.js";
import traincouchRouter from "./routes/couches.js";
import trainSeatRouter from "./routes/seats.js";
import searchRouter from "./routes/trainsearch.js";

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
app.use("/api/v1/jwt", jwtRouter);
app.use("/api/v1/auth", authRouer);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/station", stationRouter);
app.use("/api/v1/train", trainRouter);
app.use("/api/v1/stoppage", trainStoppageRouter);
app.use("/api/v1/schedule", trainScheduleRouter);
app.use("/api/v1/booking", bookingRouter);
app.use("/api/v1/bookingseats", bookingSeatsRouter);
app.use("/api/v1/couches", traincouchRouter);
app.use("/api/v1/seats", trainSeatRouter);
app.use("/api/v1/search", searchRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
