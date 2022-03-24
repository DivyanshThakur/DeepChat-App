import React from "react";
import ConversationList from "../ConversationList";
import ChatMessage from "../ChatMessage";
import "./Messenger.css";

export default function Messenger() {
  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList />
      </div>

      <div className="content">
        <ChatMessage />
      </div>
    </div>
  );
}
