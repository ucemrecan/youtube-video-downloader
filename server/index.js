import express from "express";
import routes from "./routes/index.js";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();
const PORT = 5000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Youtube Download API",
      version: "1.0.0",
    },
    servers: ["http://localhost:5000"],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());
app.use("/", routes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
