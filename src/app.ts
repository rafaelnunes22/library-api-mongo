import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { conn } from "./db/conn";
import { routes } from "./routes/router";

const app = express();

app.use(cors());
app.use(express.json());

// DB connection
conn();

// routes
app.use("/api", routes);

app.listen(process.env.PORT || "3000", () => {
  console.log("App is running on port 3000");
});
