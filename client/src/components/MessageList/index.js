import { Avatar, Box, Typography } from "@material-ui/core";
import { format } from "date-fns";
import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import FileMessage from "../FileMessage";

import useStyles from "./style";
import LinkPreview from "../LinkPreview";

const MessageList = ({ data, user, scroll }) => {
  const classes = useStyles();

  return data?.map((message) => {
    const doc = document.createElement("html");
    doc.innerHTML = message.content;
    const links = doc.getElementsByTagName("a");
    const url = links.length > 0 ? links[0].getAttribute("href") : null;

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
            <Typography className={classes.senderName}>
              {message.sender.name}
            </Typography>
            <div className={classes.date}>
              {format(new Date(message.createdAt), "p")}
            </div>
          </div>
          {url && (
            <LinkPreview
              style={{ height: "6.5rem" }}
              scroll={scroll}
              url={url}
            />
          )}
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
