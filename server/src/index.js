import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import consola from "consola";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import config from "./config/index.js";
// import socketIO from "./utils/socketIO.js";
import { errorHandler, notFound } from "./middleware/error.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";

const app = express();

const httpServer = createServer(app);
// const options = {
//   cors: {
//     origin: [config.CLIENT_DEV, config.DEEPCHAT_APP],
//     credentials: true,
//   },
// };

// const io = new Server(httpServer, options);

connectDB();

/* Custom Middlewares */
app.use(helmet());
app.use(
  cors({
    origin: [config.CLIENT_DEV, config.DEEPCHAT_APP],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/* Apis */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (_, res) => res.send("Welcome to DeepChat App API!"));

/* ERROR HANDLER */
app.use(notFound);
app.use(errorHandler);

/* Socket IO */
// io.on("connection", socketIO);

/* Server */
const PORT = config.PORT || 5000;

httpServer.listen(PORT, () => {
  consola.success(
    `Server running in ${config.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

process.on("unhandledRejection", (err) => {
  consola.error(`Logged Error: ${err}`);
});
