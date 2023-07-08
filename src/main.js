import mongoose from "mongoose";
import { Server } from "socket.io";
import { ProductsSocket } from "./sockets/products.socket.js";
import { MessagesSocket } from "./sockets/messages.socket.js";
import { MONGODB_CNX_STR } from "./config/passwords.js";
import { winstonLogger } from "./middlewares/logger.js";
import { app } from "./app.js";

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_CNX_STR);
    winstonLogger.info("Connected to MongoDB");
  } catch (error) {
    winstonLogger.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}
connectToMongoDB();

const server = app.listen(8080, () => {
  winstonLogger.info("Server is running on port 8080");
});

const io = new Server(server);

io.on("connection", (socket) => {
  ProductsSocket(io, socket);
  MessagesSocket(io, socket);
});
