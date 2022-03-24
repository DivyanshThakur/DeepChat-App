import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
  },
  messageBox: {
    flex: 1,
  },
  markdown: {
    borderRadius: "2rem",
    background: "#d1e0eb",
    margin: "0.1rem 0rem",
    padding: "0.5rem 1rem",
    marginLeft: "0.7rem",
  },
  user: {
    background: "#a9dbfc",
  },
  date: {
    textAlign: "end",
    margin: "0 0.5rem 0.5rem",
  },
}));

export default useStyles;
