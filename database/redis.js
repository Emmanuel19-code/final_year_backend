import { createClient } from "redis";

const client = createClient({
  password: "x6rjm1Y2VNdEb8aRiWUUsRUFG7rIE5Mm",
  socket: {
    host: "redis-13149.c244.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 13149,
  },
});

client.on("connect", function () {
  console.log("Connected to Redis");
});

client.on("error", function (err) {
  console.error("Redis error:", err);
});

(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();

export default client;
