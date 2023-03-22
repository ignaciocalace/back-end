import { messagesManager } from "../services/messages.service.js";

export function MessagesSocket(io, socket) {
  socket.on("newUser", async (user) => {
    socket.broadcast.emit("newUser", user);
  });
  socket.on("newMessage", async (msg) => {
    messagesManager.add(msg);
    io.sockets.emit("messages", await messagesManager.getAll());
  });
  socket.on("refreshMessages", async () => {
    io.sockets.emit("messages", await messagesManager.getAll());
  });
}
