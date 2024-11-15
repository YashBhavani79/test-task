import mongoose from "mongoose";
import logger from "../../comman/utils/logger";
import dotenv from "dotenv";
dotenv.config();

if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "todoList"
    })
    .then(() => {
      logger.info(`Database connected`);
    })
    .catch(error => logger.error(error));
} else {
  logger.error("MONGO_URI environment variable is not set");
}
