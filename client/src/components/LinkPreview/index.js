import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import useStyles from "./style";

const LinkPreview = ({ url, scroll }) => {
  const classes = useStyles();
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    const getMeta = async () => {
      const { data } = await axios.get(
        `${
          process.env.NODE_ENV === "development"
            ? process.env.REACT_APP_SERVER_URL_DEV
            : process.env.REACT_APP_SERVER_URL
        }/api/messages/meta?link=${url}`
      );
      setMetadata(data.data);
      const content = JSON.stringify(data.data);
      localStorage.setItem(`link-preview-${url}`, content);
      scroll();
    };

    if (url) {
      const data = JSON.parse(localStorage.getItem(`link-preview-${url}`));
      if (data) {
        setMetadata(data);
      } else {
        getMeta();
      }
    }
    return () => {
      setMetadata({});
    };
  }, [url, scroll]);

  return (
    <a className={classes.root} href={url} target="_blank" rel="noreferrer">
      {metadata.image && (
        <Avatar
          variant="rounded"
          className={classes.image}
          src={metadata.image}
        />
      )}
      <div className={classes.info}>
        <Typography className={classes.title}>{metadata.title}</Typography>
        <Typography className={classes.description}>
          {metadata.description}
        </Typography>
        <Typography className={classes.source}>{metadata.source}</Typography>
      </div>
    </a>
  );
};

export default LinkPreview;
