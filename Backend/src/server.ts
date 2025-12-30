import express from "express";
import authRoutes from "./routers/Auth.router";
import cors from "cors";
import "dotenv/config.js";
const app = express();
const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("Please provide application port");
}

const corsConfig = {
  origin: ["http://localhost:3000"],
};

// middlewares
app.use(express.json());
app.use(cors(corsConfig));

// routes
app.use("/api/auth", authRoutes);

// app runners
app.listen(PORT, () => {
  console.log(`Backend: server is up at port ${PORT}`);
});
