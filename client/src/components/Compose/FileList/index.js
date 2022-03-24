import { Box, IconButton, Typography } from "@material-ui/core";
import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import useStyles from "./style";

const FileList = ({ files, onDelete }) => {
  const classes = useStyles();

  if (!files || files.length === 0) return null;

  return (
    <Box display="flex" className={classes.root}>
      {files.map((file) => {
        return (
          <Box key={file.name} className={classes.file}>
            <Typography className={classes.name}>{file.name}</Typography>
            <IconButton
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
