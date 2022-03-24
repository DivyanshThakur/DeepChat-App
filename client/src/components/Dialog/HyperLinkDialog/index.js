import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import useStyles from "./style.js";
import { TextField, Typography } from "@material-ui/core";
import UpdateButtonGroup from "../../button/UpdateButtonGroup";

const HyperLinkDialog = ({ onClose, onSave, ...props }) => {
  const classes = useStyles();
  const initialData = {
    url: "",
    text: "",
  };
  const [data, setData] = useState(initialData);

  const handleOnClose = () => {
    setData(initialData);
    onClose();
  };

  const updateData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Dialog onClose={handleOnClose} {...props}>
      <DialogContent className={classes.content}>
        <Typography className={classes.title}>Add Link</Typography>
        <form>
          <TextField
            style={{ marginBottom: "1rem" }}
            fullWidth
            autoFocus
            label="Url"
            id="url"
            name="url"
            variant="outlined"
            value={data.url}
            onChange={updateData}
          />
          <TextField
            fullWidth
            label="Text"
            id="text"
            name="text"
            variant="outlined"
            value={data.text}
            onChange={updateData}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <UpdateButtonGroup
          handleOnSubmit={() => {
            handleOnClose();
            onSave(data);
          }}
          handleOnClose={handleOnClose}
          disabled={data.url.trim() === "" || data.text.trim() === ""}
        />
      </DialogActions>
    </Dialog>
  );
};

export default HyperLinkDialog;
