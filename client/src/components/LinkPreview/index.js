import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import useStyles from "./style";
// import { useGetMetadataQuery } from "../../redux/api/message";

const LinkPreview = ({ url }) => {
  const classes = useStyles();
  const [metadata, setMetadata] = useState({});

  useEffect(() => {
    const getMeta = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL_DEV}/api/messages/meta?link=${url}`
      );
      setMetadata(data.data);
    };

    if (url) getMeta();
  }, [url]);

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
        <Typography className={classes.description}>{metadata.description}</Typography>
        <Typography className={classes.source}>{metadata.source}</Typography>
      </div>
    </a>
  );
};

export default LinkPreview;
