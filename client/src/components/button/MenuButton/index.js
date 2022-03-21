import React from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useLogoutMutation } from "../../../redux/api/auth";
import { removeUserAuth } from "../../../utils/userAuth";
import protectedHandler from "../../../utils/protectedHandler";
import { CircularProgress } from "@material-ui/core";

const MenuButton = () => {
  const [logout, { isLoading = true }] = useLogoutMutation();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutUser = protectedHandler(async () => {
    await logout().unwrap();
    removeUserAuth();
    history.push("/auth/login");
  });

  return (
    <>
      <IconButton
        color="primary"
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={logoutUser} style={{ width: "6.8rem" }}>
          Logout
          {isLoading && (
            <CircularProgress
              style={{
                height: "0.9375rem",
                width: "0.9375rem",
                color: "blue",
                marginLeft: "0.5rem",
              }}
            />
          )}
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuButton;
