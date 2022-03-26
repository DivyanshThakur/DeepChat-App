import React from "react";
import { IconButton } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import useStyles from "./style";

const Notification = () => {
  const classes = useStyles();

  return (
    <IconButton color="primary" aria-label="cart">
      <Badge badgeContent={1} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
};

export default Notification;
