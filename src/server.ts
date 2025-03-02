import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", async (req, res, next) => {
  res.send("Service is Running");
});

app.use(notFound);
app.use(errorHandler);

export default app;
