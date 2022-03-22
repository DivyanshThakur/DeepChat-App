import React, { useState, useEffect } from "react";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import "./ConversationList.css";
import SearchBar from "../Searchbar";
import MenuButton from "../button/MenuButton";
import { useGetChatsQuery } from "../../redux/api/chat";
import ChatListSkeleton from "../Skeleton/chatList";
import NewChatDialog from "../Dialog/NewChatDialog";

export default function ConversationList() {
  const { data, isLoading } = useGetChatsQuery();
  const [conversations, setConversations] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!data || data.length === 0) return;
    setConversations(data);
  }, [data]);

  const handleOnSearchChange = (value) => {
    setValue(value);
    setConversations(
      data?.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="conversation-list">
      <Toolbar
        title="DeepChats"
        leftItems={[<Avatar alt="User Avatar" src="" />]}
        rightItems={[
          <MenuButton />,
          <IconButton color="primary" onClick={() => setOpen(true)}>
            <AddIcon />
          </IconButton>,
        ]}
      />
      <SearchBar
        placeholder="Search Chats"
        value={value}
        onChange={(e) => handleOnSearchChange(e.target.value)}
        onCancel={() => handleOnSearchChange("")}
      />
      {isLoading
        ? [1, 2, 3, 4, 5, 6, 7].map((id) => <ChatListSkeleton key={id} />)
        : conversations?.map((conversation) => (
            <ConversationListItem key={conversation._id} data={conversation} />
          ))}
      <NewChatDialog
        open={open}
        value={"demo@gmail.com"}
        handleClose={() => setOpen(false)}
        aria-labelledby="new-chat-dialog"
      />
    </div>
  );
}
