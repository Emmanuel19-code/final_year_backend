const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    // Attach event listeners to the socket instance
    socket.on("joined", (message) => {
      console.log("Joined event received:", message);
    });

    socket.on("joinConversation", ({ conversationId, name, userIdentity }) => {
      console.log(conversationId, name, userIdentity);
    });

    socket.on("joinMeeting", () => {
      console.log("a user joined a meeting");
    });

    socket.on("newppointment", (message) => {
      console.log("newppointment received:", message);
      io.emit("newppointment", message); // Broadcast to all connected clients
    });
  });
};

export default handleSocketConnection;
