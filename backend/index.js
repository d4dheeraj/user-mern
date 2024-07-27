import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/index.js";
import userRouter from "./routes/user.js";

dotenv.config();
dbConnection();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
