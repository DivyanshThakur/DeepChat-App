import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
// import ReactMarkdown from "react-markdown";
import useStyles from "./style";

const ConversationListItem = ({ data, select, onSelect }) => {
  const classes = useStyles();
  return (
    <ListItem
      selected={select === data._id}
      button
      onClick={() => onSelect(data._id)}
    >
      <ListItemAvatar>
        <Avatar className={classes.avatar} src={data.avatar} />
      </ListItemAvatar>
      <Box className={classes.userBox}>
        <Typography component="p" className={classes.name}>
          {data.name}
        </Typography>
        {/* <ReactMarkdown
        className={classes.md}
        >
          {data?.latestMessage?.content?.split('\n')[0]}
        </ReactMarkdown> */}
      </Box>
    </ListItem>
  );
};

export default ConversationListItem;
