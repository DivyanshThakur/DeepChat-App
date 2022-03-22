import mongoose from "mongoose";
import { DefBoolean, ReqString } from "./types.js";
import { CHAT, MESSAGE, USER } from "../utils/constants.js";

const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const userSchema = {
  type: ObjectId,
  ref: USER,
};

const chatSchema = new Schema(
  {
    name: ReqString,
    isGroupChat: DefBoolean,
    latestMessage: {
      type: ObjectId,
      ref: MESSAGE,
    },
    users: [userSchema],
    admins: [userSchema],
  },
  {
    timestamps: true,
  }
);

const Chat = model(CHAT, chatSchema);

export default Chat;
