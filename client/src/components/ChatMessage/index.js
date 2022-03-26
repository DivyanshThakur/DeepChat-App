import React from "react";
// import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
import { Avatar, Box, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import Compose from "../Compose";
import Toolbar from "../Toolbar";
import { useGetChatsQuery } from "../../redux/api/chat";
import ScrollableChat from "../ScrollableChat";
import ChatLogo from "../../assets/chatLogo.jpg";
import useStyles from "./style";

export default function ChatMessage() {
  const classes = useStyles();

  const chatId = useSelector((state) => state.selectedChat.chatId);
  const chat = useGetChatsQuery(undefined, {
    selectFromResult: ({ data }) => data?.find(({ _id }) => _id === chatId),
  });

  return chatId ? (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Toolbar
        title={chat.name}
        leftItems={[
          <Avatar
            style={{
              border: "0.01rem solid rgba(0, 0, 0, 0.1)",
              height: "2.8rem",
              width: "2.8rem",
            }}
            key={38}
            alt={chat.name}
            src={chat.avatar}
          />,
        ]}
        rightItems={
          [
            // <IconButton key="233" color="primary">
            //   <InfoIcon />
            // </IconButton>,
          ]
        }
      />
      <ScrollableChat chatId={chatId} />
      <Compose chatId={chatId} />
    </div>
  ) : (
    <Box
      display="flex"
      style={{ height: "100%" }}
      alignItems="center"
      justifyContent="center"
    >
      <img src={ChatLogo} alt="DeepChat App Logo" className={classes.logo} />
      <Box className={classes.appNameBox}>
        <Typography className={classes.title}>DeepChat App</Typography>
        <Typography className={classes.subHeading}>
          Chatting that never ends.
        </Typography>
      </Box>
    </Box>
  );
}
