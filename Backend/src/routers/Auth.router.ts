import express from "express";
import {
  checkSessionController,
  loginController,
  refreshTokenController,
  signupController,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/check-session", checkSessionController);
router.post("/refresh-token", refreshTokenController);

export default router;
