import Pusher from "pusher";
import {} from "dotenv/config"

const pusher = new Pusher({
  appId: process.env.PUSHER_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});

//pusher.trigger("my-channel", "my-event", {
//  message: "hello world",
//});

export default pusher