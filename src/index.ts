import express from "express";
import Routes from "./router/index";
import dotenv from "dotenv";
import logger from "./comman/utils/logger";
import "./config/Database/mongodb";
import swaggerAutogen from "swagger-autogen";
import swaggerUi from "swagger-ui-express";
import bodyparser from "body-parser";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/api/v1", Routes);

const doc = {
  info: {
    title: "My API",
    description: "Automatically generated API documentation",
    version: "1.0.0"
  },
  host: `localhost:${port}`,
  basePath: "/api"
};

const outputFile = "../swagger-output.json";
const endpointsFiles = ["./src/index.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc)
  .then(() => {
    app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(require("../swagger-output.json"))
    );
  })
  .catch(error => {
    logger.error("Error generating Swagger documentation:", error);
  });

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
  logger.info(`Swagger docs available at http://localhost:${port}/api-docs`);
});
