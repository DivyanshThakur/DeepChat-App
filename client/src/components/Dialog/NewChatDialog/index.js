import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Button, Divider, Typography } from "@material-ui/core";
import SearchBar from "../../Searchbar";
import useStyles from "./style.js";
import AvailableUsers from "../../AvailableUsers";
import UpdateButtonGroup from "../../button/UpdateButtonGroup";
import { useGetUsersQuery } from "../../../redux/api/user";
import { setChatId } from "../../../redux/slices/selectedChat";
import { useAccessChatsMutation } from "../../../redux/api/chat";
import protectedHandler from "../../../utils/protectedHandler";

const NewChatDialog = ({ handleClose, setOpen, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [accessChat, { isChatFetching }] = useAccessChatsMutation();

  const { data, refetch } = useGetUsersQuery();

  const [value, setValue] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [users, setUsers] = useState([]);

  const handleOnClose = () => {
    setSelectedUserId("");
    handleClose();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    setUsers(data);
  }, [data]);

  const handleOnSearchChange = (value) => {
    setValue(value);
    setUsers(
      data?.filter(
        ({ name, email }) =>
          name.toLowerCase().includes(value.toLowerCase()) ||
          email.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSelectedChat = protectedHandler(async () => {
    handleOnClose();
    const chat = await accessChat({ userId: selectedUserId }).unwrap();

    dispatch(setChatId(chat._id));
  });

  return (
    <Dialog onClose={handleOnClose} {...props}>
      <DialogContent className={classes.content}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={() => setOpen(2)}
        >
          New Group Chat
        </Button>
        <Divider className={classes.divider} />
        <Typography className={classes.title}>New Chat</Typography>
        <SearchBar
          className={classes.search}
          placeholder="Search Users"
          value={value}
          onChange={(e) => handleOnSearchChange(e.target.value)}
          onCancel={() => handleOnSearchChange("")}
        />
        <AvailableUsers
          data={users}
          selected={selectedUserId}
          onSelect={setSelectedUserId}
        />
      </DialogContent>
      <DialogActions>
        <UpdateButtonGroup
          isLoading={isChatFetching}
          handleOnSubmit={handleSelectedChat}
          handleOnClose={handleOnClose}
          disabled={selectedUserId.length === 0}
        />
      </DialogActions>
    </Dialog>
  );
};

export default NewChatDialog;
