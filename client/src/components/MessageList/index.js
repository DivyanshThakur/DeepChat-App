import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import "./MessageList.css";
import { useGetChatsQuery } from "../../redux/api/chat";
import ScrollableChat from "../ScrollableChat";

export default function MessageList() {
  const chatId = useSelector((state) => state.selectedChat.chatId);
  const chat = useGetChatsQuery(undefined, {
    selectFromResult: ({ data }) => data?.find(({ _id }) => _id === chatId),
  });

  return (
    <div className="message-list">
      <Toolbar
        title={chat.name}
        leftItems={[
          <Avatar
            style={{
              border: "0.05rem solid black",
              height: "2.8rem",
              width: "2.8rem",
            }}
            key={38}
            alt={chat.name}
            src={chat.avatar}
          />,
        ]}
        rightItems={[
          <IconButton key="233" color="primary">
            <InfoIcon />
          </IconButton>,
        ]}
      />
      <ScrollableChat chatId={chatId} />
      <Compose chatId={chatId} />
    </div>
  );
}
