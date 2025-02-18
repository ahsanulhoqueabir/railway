import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/user.js";
dotenv.config();

const app = express();
const router = express.Router();
app.use(express.json());

router.get("/", (req, res) => {
    res.send("Welcome to the API");
    });
app.use("/", router);
app.use("/user", userRouter);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
