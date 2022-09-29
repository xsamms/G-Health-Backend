const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData.userId);
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });

    socket.on("new message", (newMessageRecieved, reciever) => {
      console.log(reciever);

      // var chat = newMessageRecieved.chat;

      // if (!chat.users) return console.log("chat.users not defined");

      // chat.users.forEach((user) => {
      //   if (user._id == newMessageRecieved.sender._id) return;

      socket.in(reciever).emit("message recieved", newMessageRecieved);
      // });
    });

    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });
};

module.exports = {
  registerSocketServer,
};
