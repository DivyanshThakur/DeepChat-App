import mongoose from "mongoose";
import { CHAT, MESSAGE, USER } from "../utils/constants.js";
import { ReqString } from "./types.js";

const { Schema, model } = mongoose;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema(
  {
    sender: {
      type: ObjectId,
      ref: USER,
    },
    content: ReqString,
    files: [
      {
        name: ReqString,
        type: ReqString,
        url: ReqString,
        downloadUrl: ReqString,
      },
    ],
    chat: {
      type: ObjectId,
      ref: CHAT,
      index: true,
    },
    readBy: [
      {
        type: ObjectId,
        ref: USER,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Message = model(MESSAGE, messageSchema);

export default Message;
