import mongoose from "mongoose";
import { CHAT, MESSAGE, USER } from "../utils/constants";
import { ReqString } from "./types";

const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema(
  {
    sender: {
      type: ObjectId,
      ref: USER,
    },
    content: ReqString,
    contentType: ReqString,
    chat: {
      type: ObjectId,
      ref: CHAT,
    },
  },
  {
    timestamps: true,
  }
);

const Message = model(MESSAGE, messageSchema);

export default Message;
