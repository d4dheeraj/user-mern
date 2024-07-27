import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo DB is connected");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnection;
