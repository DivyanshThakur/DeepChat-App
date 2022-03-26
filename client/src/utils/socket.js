import io from "socket.io-client";
export default io(
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_SERVER_URL_DEV
    : process.env.REACT_APP_SERVER_URL
);
