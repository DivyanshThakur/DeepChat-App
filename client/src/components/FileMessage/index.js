import React from "react";
import { Avatar, Box, IconButton, Typography } from "@material-ui/core";
import DownloadIcon from "@material-ui/icons/GetApp";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import useStyles from "./style";

const FileMessage = ({ data }) => {
  const classes = useStyles();

  if (!data || data.length === 0) return null;

  const mimetypes = ["image/png", "image/jpeg", "image/svg+xml", "image/gif"];

  return (
    <Box display="flex" className={classes.root}>
      {data.map((file, index) => {

        return (
          <Box key={index} className={classes.file}>
            <IconButton
              color="primary"
              size="small"
              href={file.url}
              target="_blank"
            >
              <Avatar src={mimetypes.includes(file.type) && file.url}>
                <InsertDriveFileIcon />
              </Avatar>
            </IconButton>
            <Typography className={classes.name}>{file.name}</Typography>
            <IconButton color="primary" size="small" href={file.downloadUrl}>
              <DownloadIcon />
            </IconButton>
          </Box>
        );
      })}
    </Box>
  );
};

export default FileMessage;
