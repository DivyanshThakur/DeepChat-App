import io from "socket.io-client";
export default io(
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://deep-chat-app.vercel.app"
);
