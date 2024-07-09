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
import hospitalRoute from "./routers/hospital.js"
import http from "http";
import { Server } from "socket.io";
import createRouter from "./routers/User.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

app.get("/", (req, res) => {
  res.status(200).send(`<h1>Starting your project</h1>`);
});



app.use("/api/v1/user", createRouter(io));
app.use("/api/v1/appointment",appointmentRoute)
app.use("/api/v1/consultant",healthworkerRoute)
app.use("/api/v1/chat",conversationRoute)
app.use("/api/v1/message",messageRoute)
app.use("/api/v1/hospital",hospitalRoute)
app.use("/api/v1/conversation",conversationRoute)

app.listen(5000, () => {
  connect();
  console.log("server is running 🚀🚀");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const connect =()=>{
  try {
    connection();
  } catch (error) {
    app.get("/api/error",(req,res)=>{
       return res.status(400).json({
        msg:"An error occured while connecting to the server"
       })
    })
  }
}

