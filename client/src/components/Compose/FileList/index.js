import { Avatar, Box, IconButton, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import CancelIcon from "@material-ui/icons/Cancel";
import useStyles from "./style";

const FileList = ({ files, onDelete }) => {
  const classes = useStyles();
  const [fileImage, setFileImage] = useState({});

  useEffect(() => {
    files?.forEach((file) => preview(file));
  }, [files]);

  if (!files || files.length === 0) return null;

  const preview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (image) =>
      setFileImage({ [file.name]: image.target.result });
  };

  return (
    <Box display="flex" className={classes.root}>
      {files.map((file) => {
        return (
          <Box key={file.name} className={classes.file}>
            <Avatar className={classes.avatar} src={fileImage[file.name]}>
              <InsertDriveFileIcon />
            </Avatar>
            <Typography className={classes.name}>{file.name}</Typography>
            <IconButton
              className={classes.cancel}
              color="primary"
              size="small"
              onClick={() => onDelete(file)}
            >
              <CancelIcon />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
};

export default FileList;
