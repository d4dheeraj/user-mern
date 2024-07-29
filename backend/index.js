import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import dbConnection from "./db/index.js";
import userRouter from "./routes/user.js";

dotenv.config();
dbConnection();
const PORT = process.env.PORT;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

app.get("/", (_, res) => {
  res.send("Server is up and running");
});

app.use("/user", userRouter);

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
