import { Typography } from "@material-ui/core";
import React from "react";

import "./ConversationListItem.css";

export default function ConversationListItem({ data }) {
  const { avatar, name, latestMessage } = data;

  return (
    <div className="conversation-list-item">
      <img className="conversation-photo" src={avatar} alt="conversation" />
      <div className="conversation-info">
        <Typography className="conversation-title">{name}</Typography>
        {latestMessage && (
          <p className="conversation-snippet">{latestMessage}</p>
        )}
      </div>
    </div>
  );
}
