import express from "express";
import userRoute from "./routers/User.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {} from "dotenv/config";
import {
  googleAuth,
  googleAuthCallback,
  googleAuthCallbackHandler,
} from "./Usercontroller/googlgeAuthController.js";
import { connection } from "./database/connection.js";
import appointmentRoute from "./routers/appointment.js"

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Starting your project</h1>`);
});

app.get("/auth/google", googleAuth);
app.get("/auth/google/callback", googleAuthCallback, googleAuthCallbackHandler);

app.use("/user", userRoute);
app.use("/appointment",appointmentRoute)


app.listen(5000, () => {
  console.log("server is running 🚀🚀");
});

connection()