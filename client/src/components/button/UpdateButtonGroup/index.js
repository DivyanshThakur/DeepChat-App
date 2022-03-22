import React from "react";
import Button from "@material-ui/core/Button";
import ChatIcon from '@material-ui/icons/Chat';
import LoadingIconButton from "../LoadingIconButton";
import useStyles from "./style";

const UpdateButtonGroup = ({
  isLoading,
  handleOnClose,
  handleOnSubmit,
  disabled,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        disableFocusRipple
        className={classes.cancelButton}
        onClick={handleOnClose}
        color="primary"
      >
        Cancel
      </Button>
      <LoadingIconButton
        type="submit"
        onClick={handleOnSubmit}
        className={classes.saveButton}
        icon={<ChatIcon />}
        color="primary"
        variant="contained"
        isLoading={isLoading}
        disabled={disabled}
      >
        Chat
      </LoadingIconButton>
    </div>
  );
};

export default UpdateButtonGroup;
