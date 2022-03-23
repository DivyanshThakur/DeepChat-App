import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import GroupIcon from "@material-ui/icons/Group";
import { useDispatch } from "react-redux";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import {
  Avatar,
  Chip,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import SearchBar from "../../Searchbar";
import useStyles from "./style.js";
import AvailableUsers from "../../AvailableUsers";
import UpdateButtonGroup from "../../button/UpdateButtonGroup";
import { useGetUsersQuery } from "../../../redux/api/user";
import { setChatId } from "../../../redux/slices/selectedChat";
import { useCreateGroupMutation } from "../../../redux/api/chat";
import protectedHandler from "../../../utils/protectedHandler";

const NewGroupChatDialog = ({ handleClose, ...props }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const { data, refetch } = useGetUsersQuery();

  const [value, setValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const updateSelectedUsers = (user) => {
    const isPresentIndex = selectedUsers.findIndex(
      (selectedUser) => selectedUser._id === user._id
    );

    if (isPresentIndex === -1) {
      setSelectedUsers([...selectedUsers, user]);
    } else {
      setSelectedUsers(selectedUsers.filter(({ _id }) => _id !== user._id));
    }
  };

  const handleOnClose = () => {
    setSelectedUsers([]);
    setGroupName("");
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
    const data = {
      name: groupName.trim(),
      users: selectedUsers.map(({ _id }) => _id),
    };
    console.log(data);
    const groupChat = await createGroup(data).unwrap();
    console.log(groupChat);
    dispatch(setChatId(groupChat._id));
    handleOnClose();
  });

  const handleDelete = (userId) => {
    setSelectedUsers(
      selectedUsers.filter((selectedUser) => selectedUser._id !== userId)
    );
  };

  return (
    <Dialog maxWidth="md" onClose={handleOnClose} {...props}>
      <DialogContent className={classes.content}>
        <Typography className={classes.title}>Create Group</Typography>
        <Grid container className={classes.grid}>
          <Grid item xs={12} md={6}>
            <div className={classes.form}>
              <form>
                <TextField
                  fullWidth
                  label="Group name"
                  variant="outlined"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <GroupIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </form>
              <Typography className={classes.text}>Participants</Typography>
              {selectedUsers.length > 0 && (
                <Paper component="ul" className={classes.paper}>
                  {selectedUsers.map((user) => {
                    return (
                      <li key={user._id}>
                        <Chip
                          avatar={<Avatar alt={user.name} src={user.avatar} />}
                          label={user.name}
                          onDelete={() => handleDelete(user._id)}
                          className={classes.chip}
                        />
                      </li>
                    );
                  })}
                </Paper>
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.userList}>
            <SearchBar
              className={classes.search}
              placeholder="Search Users"
              value={value}
              onChange={(e) => handleOnSearchChange(e.target.value)}
              onCancel={() => handleOnSearchChange("")}
            />
            <AvailableUsers
              multiple
              data={users}
              selected={selectedUsers}
              onSelect={updateSelectedUsers}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <UpdateButtonGroup
          isLoading={isLoading}
          handleOnSubmit={handleSelectedChat}
          handleOnClose={handleOnClose}
          disabled={selectedUsers.length === 0 || groupName.trim() === ""}
        />
      </DialogActions>
    </Dialog>
  );
};

export default NewGroupChatDialog;
