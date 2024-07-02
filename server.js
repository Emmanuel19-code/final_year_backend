import express from "express";
import userRoute from "./routers/User.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import {} from "dotenv/config";
import { connection } from "./database/connection.js";
import appointmentRoute from "./routers/appointment.js"
import healthworkerRoute from "./routers/Healthworker.js"
import conversationRoute from "./routers/conversation.js"
import messageRoute from "./routers/message.js"

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Starting your project</h1>`);
});



app.use("/api/v1/user", userRoute);
app.use("/api/v1/appointment",appointmentRoute)
app.use("/api/v1/consultant",healthworkerRoute)
app.use("/api/v1/chat",conversationRoute)
app.use("/api/v1/message",messageRoute)

app.listen(5000, () => {
  console.log("server is running 🚀🚀");
});

connection()