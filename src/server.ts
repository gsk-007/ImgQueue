import express from "express";
import "express-async-errors";
import router from "./router";
import morgan from "morgan";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import path from "path";

const app = express();
app.disable("x-powered-by");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", async (req, res, next) => {
  res.send("Service is Running");
});

app.use("/static", express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

export default app;
