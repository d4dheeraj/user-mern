import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/index.js";

dotenv.config();
dbConnection();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is up and running");
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
