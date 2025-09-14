const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

let onlineUsers = [];

const httpServer = http.createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URI,
    methods: ["GET", "POST"]
  }
});//this step is done because our server and client are running on different domain

io.on("connection", (socket) => {
  console.log("New Connection",socket.id);

  //listen to a connection
  socket.on("addNewUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
    }
    io.emit("getOnlineUsers", onlineUsers);
  });
  // listen to message
  socket.on("sendMessage",(message)=>{
    const user = onlineUsers.find((user) => user.userId === message.recipientId);
    if(user){
      io.to(user.socketId).emit("getMessage",message);
      io.to(user.socketId).emit("getNotification",{senderId:message.senderId,isRead:false,date:new Date()});
    }
  });
  //listen to a disconnection
  socket.on("disconnect",()=>{
    onlineUsers = onlineUsers.filter((user)=> user.socketId !== socket.id);
    io.emit("getOnlineUsers",onlineUsers);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket server running on port ${PORT}`);
});