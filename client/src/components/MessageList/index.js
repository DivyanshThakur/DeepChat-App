import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import "./MessageList.css";

export default function MessageList() {
  const chatId = useSelector((state) => state.selectedChat.chatId);
  console.log(chatId);

  return (
    <div className="message-list">
      <Toolbar
        title="Conversation Title"
        leftItems={[<Avatar alt="User Avatar" src="" />]}
        rightItems={[
          <IconButton color="primary">
            <InfoIcon />
          </IconButton>,
        ]}
      />
      <div className="message-list-container"></div>
      {/* <img src="https://drive.google.com/uc?export=view&id=1L9ab_xjbqvG-ncKoR8wDamQkwIatq4Ka" /> */}
      <Compose />
    </div>
  );
}
