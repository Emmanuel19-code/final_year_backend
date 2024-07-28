const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("joinConversation", ({ conversationId, name, userIdentity }) => {
      console.log(conversationId, name, userIdentity);
    });

    socket.on("joinMeeting",()=>{
         console.log("a user connected")
    })
  });
};

export default handleSocketConnection
