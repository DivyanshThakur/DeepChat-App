import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    border: "1px solid #ddd",
    display: "flex",
    padding: "0.2rem",
    borderRadius: "1rem",
    background: "#ffe",
    margin: "0.5rem 0",
    textDecoration: "none",
    color: "black",
    maxWidth: "calc(100vw - 33rem)",
  },
  image: {
    height: "4rem",
    width: "4rem",
    margin: "1rem",
    marginRight: "0rem",
  },
  info: {
    marginLeft: "1rem",
    maxWidth: "calc(100% - 7rem)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "1.2rem",
    fontWeight: 500,
    fontFamily: "'Catamaran', sans-serif",
  },
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxLines: 1,
  },
  source: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxLines: 1,
    // fontSize: "0.9rem",
    color: "gray",
  },
}));

export default useStyles;
