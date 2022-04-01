import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: "wrap",
  },
  file: {
    backgroundImage: `linear-gradient(
      to right top,
      #f0f0f0,
      #f4f4f4,
      #f7f7f7,
      #fbfbfb,
      #ffffff
    )`,
    boxShadow: "0 0.2rem 1.9rem -1rem rgba(0, 0, 0, 0.6)",
    display: "flex",
    border: "0.01rem solid #ccc",
    borderRadius: "0.7rem",
    padding: "0.5rem",
    margin: "0.5rem 0.5rem 1rem",
  },
  name: {
    maxWidth: "15rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "auto 0.5rem",
  },
}));

export default useStyles;
