import express from "express";
import "dotenv/config";
import authRoutes from "./routers/Auth.router";
import cors from "cors";

const app = express();
const PORT = process.env.APP_PORT!;

if (!PORT) {
  throw new Error("Please provide application port");
}

const corsConfig = {
  origin: ["http://localhost:5713/"],
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
