import React, { useState, useEffect } from "react";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import "./ConversationList.css";
import SearchBar from "../Searchbar";
import MenuButton from "../button/MenuButton";

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = () => {
    axios.get("https://randomuser.me/api/?results=20").then((response) => {
      let newConversations = response.data.results.map((result) => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text: "Hello world! This is a long message that needs to be truncated.",
        };
      });
      setConversations([...conversations, ...newConversations]);
    });
  };

  return (
    <div className="conversation-list">
      <Toolbar
        title="DeepChats"
        leftItems={[<Avatar alt="User Avatar" src="" />]}
        rightItems={[
          <MenuButton />,
          <IconButton color="primary">
            <AddIcon />
          </IconButton>,
        ]}
      />
      <SearchBar placeholder="Search Chats" />
      {conversations.map((conversation) => (
        <ConversationListItem key={conversation.name} data={conversation} />
      ))}
    </div>
  );
}
