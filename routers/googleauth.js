import express from "express"
import { googleAuth, googleAuthCallback, googleAuthCallbackHandler } from "../Usercontroller/googlgeAuthController";

const router = express.Router()

router.get("/auth/google",googleAuth);
router.get(
  "/auth/google/callback",
  googleAuthCallback,
  googleAuthCallbackHandler
);


export default router