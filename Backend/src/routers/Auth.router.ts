import express from "express";
import {
  checkSessionController,
  loginController,
  signupController,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/check-session", checkSessionController);

export default router;
