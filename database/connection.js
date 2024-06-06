import mongoose from "mongoose";
import {} from "dotenv/config";

export const connection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://emmanueladane52:${process.env.MONGO_PASS}@cluster0.u4zracz.mongodb.net/telemedicne?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("connected to the database");
  } catch (error) {
    console.log(error,"An error occured while connecting to the database");
  }
};
