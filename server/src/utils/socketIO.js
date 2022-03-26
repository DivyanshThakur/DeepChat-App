const socketIO = (socket) => {
  console.log("socket connected");

  socket.on("setup", (userId) => {
    socket.join(userId);
    console.log("User connected:", userId);
    socket.emit("connected");
  });

  socket.on("join-chat", (room) => {
    socket.join(room);
    console.log("User joined the room:", room);
  });

  socket.on("new-message", (message) => {
    const { chat, sender } = message;
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id === sender._id) return;
      socket.in(user._id).emit("message-received", message);
    });
  });
};

export default socketIO;
