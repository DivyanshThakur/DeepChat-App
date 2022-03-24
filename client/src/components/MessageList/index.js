import { Avatar, Box } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import ReactMarkdown from "react-markdown";
import FileMessage from "../FileMessage";
import useStyles from "./style";

const MessageList = ({ data, user }) => {
  const classes = useStyles();

  return data?.map((message) => {
    return (
      <Box key={message._id} className={classes.root}>
        <div>
          <Avatar
            className={classes.avatar}
            src={message.sender.avatar}
          />
        </div>
        <div className={classes.messageBox}>
          <ReactMarkdown
            className={`${classes.markdown} ${
              message.sender._id === user._id && classes.user
            }`}
            style={{ flex: 1 }}
            linkTarget="_blank"
          >
            {message.content}
          </ReactMarkdown>
          {message?.files?.length > 0 && <FileMessage data={message.files} />}
          <div className={classes.date}>
            {format(new Date(message.createdAt), "PPp")}
          </div>
        </div>
      </Box>
    );
  });
};

export default MessageList;
