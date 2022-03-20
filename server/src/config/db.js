import mongoose from "mongoose";
import consola from "consola";
import config from "./index.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      config.NODE_ENV === "development"
        ? config.MONGO_URI_DEV
        : config.MONGO_URI,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );

    consola.success(
      `MongoDB Connected : ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    consola.error(`Error: ${error.message}`.red.bold.underline);
  }
};

export default connectDB;
