import { Avatar, Box, Typography } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import ReactMarkdown from "react-markdown";
import FileMessage from "../FileMessage";
import rehypeRaw from "rehype-raw";
import useStyles from "./style";

const MessageList = ({ data, user }) => {
  const classes = useStyles();

  return data?.map((message) => {
    return (
      <Box key={message._id} className={classes.root}>
        <div>
          <Avatar className={classes.avatar} src={message.sender.avatar} />
        </div>
        <div
          className={`${classes.messageBox} ${
            message.sender._id === user._id && classes.user
          }`}
        >
          <div className={classes.messageTitle}>
            <Typography>{message.sender.name}</Typography>
            <div className={classes.date}>
              {format(new Date(message.createdAt), "p")}
            </div>
          </div>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw]}
            style={{ flex: 1 }}
            linkTarget="_blank"
            className={classes.markdown}
          >
            {message.content}
          </ReactMarkdown>
          {message?.files?.length > 0 && <FileMessage data={message.files} />}
        </div>
      </Box>
    );
  });
};

export default MessageList;
