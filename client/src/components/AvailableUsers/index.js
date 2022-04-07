import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import useStyles from "./style";

const AvailableUsers = ({ data, selected, onSelect, multiple }) => {
  const classes = useStyles();

  return (
    <List aria-label="next-in-line-list" className={classes.root}>
      {data?.length > 0 ? (
        data.map((user, index) => {
          return (
            <React.Fragment key={index}>
              <ListItem
                selected={
                  multiple
                    ? selected?.find(({ _id }) => _id === user._id) != null
                    : selected === user._id
                }
                button
                onClick={() => onSelect(multiple ? user : user._id)}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar} src={user.avatar} />
                </ListItemAvatar>
                <Box className={classes.userBox}>
                  <Typography component="p" className={classes.name}>
                    {user.name}
                  </Typography>
                  <Typography component="p" className={classes.email}>
                    {user.email}
                  </Typography>
                </Box>
              </ListItem>
              {index + 1 !== data.length && <Divider />}
            </React.Fragment>
          );
        })
      ) : (
        <div className={classes.emptyMessage}>User not found</div>
      )}
    </List>
  );
};

export default AvailableUsers;
