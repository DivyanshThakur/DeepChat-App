import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import NewGroupChatDialog from "../Dialog/NewGroupChatDialog";
import { getUserAuth } from "../../utils/userAuth";
import { setChatId } from "../../redux/slices/selectedChat";

export default function ConversationList() {
  const selectedChatId = useSelector((state) => state.selectedChat.chatId);
  const dispatch = useDispatch();

  const { data, refetch, isLoading } = useGetChatsQuery();
  const [conversations, setConversations] = useState([]);
  const [value, setValue] = useState("");
  const [avatar, setAvatar] = useState("");
  const [open, setOpen] = useState(0);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const { avatar: userAvatar } = getUserAuth();

    setAvatar(userAvatar);
  }, []);

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

  return (
    <div className="conversation-list">
      <Toolbar
        title="DeepChats"
        leftItems={[<Avatar alt="User Avatar" src={avatar} />]}
        rightItems={[
          <MenuButton />,
          <IconButton color="primary" onClick={() => setOpen(1)}>
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
            <ConversationListItem
              key={conversation._id}
              data={conversation}
              select={selectedChatId}
              onSelect={(id) => dispatch(setChatId(id))}
            />
          ))}
      <NewChatDialog
        open={open === 1}
        setOpen={setOpen}
        handleClose={() => setOpen(0)}
        aria-labelledby="new-chat-dialog"
      />
      <NewGroupChatDialog
        open={open === 2}
        handleClose={() => setOpen(0)}
        aria-labelledby="group-chat-dialog"
      />
    </div>
  );
}
