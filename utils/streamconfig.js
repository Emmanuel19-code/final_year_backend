import { StreamChat } from "stream-chat";
import {} from "dotenv/config";
export const serverClient = StreamChat.getInstance(
  process.env.STREAM_KEY,
  process.env.STREAM_SECRET
);

