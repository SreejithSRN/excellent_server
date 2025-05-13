import { Server } from "socket.io";
import http from "http";

interface UserSocketMap {
  [userId: string]: string; // socket.id
}

const userSocketMap: UserSocketMap = {};

export const connectSocketIo = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // or your frontend domain
      methods: ["GET", "POST"],
    },
    path: "/socket.io/",
    transports: ["websocket"],
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;

    if (!userId) {
      console.log("❌ No userId in handshake");
      socket.disconnect();
      return;
    }

    // Store user's socket
    userSocketMap[userId] = socket.id;
    console.log(`✅ User connected: ${userId} (${socket.id})`);

    // Emit updated online users
    const onlineUsers = Object.keys(userSocketMap);
    io.emit("getOnlineUsers", onlineUsers);
    console.log(onlineUsers, "XXXX Danger XXXXX");

    // Join specific room
    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
      console.log(`🟢 User ${userId} joined room ${roomId}`);
    });
  

    socket.on("message", (data: { roomId: string; message: any }) => {
      const { roomId, message } = data;
      if (roomId && message) {
        socket.to(roomId).emit("message received", { message, roomId });
        console.log(`💬 Message in ${roomId} from ${userId}`);
      }
    });

     socket.on('block-user', ({ userId }) => {
            console.log(`Blocking user: ${userId}`);
            io.to(userSocketMap[userId]).emit('user-blocked');
        });
    

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`🔌 Disconnected: ${userId}`);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};
