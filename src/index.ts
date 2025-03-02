import * as dotenv from "dotenv";
dotenv.config();

import app from "./server";

const port = process.env.PORT || 5000;

const start = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be defined");
  }
  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL must be defined");
  }
  app.listen(port, () => {
    console.log(`hello on http://localhost:${port}`);
  });
};

start();
