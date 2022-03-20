import dotenv from "dotenv";
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  MONGO_URI: process.env.MONGO_URI,
  MONGO_URI_DEV: process.env.MONGO_URI_DEV,

  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE: process.env.ACCESS_TOKEN_EXPIRE,

  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE: process.env.REFRESH_TOKEN_EXPIRE,

  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

  CLIENT_DEV: process.env.CLIENT_DEV,
  DEEPCHAT_APP: process.env.DEEPCHAT_APP,
};
