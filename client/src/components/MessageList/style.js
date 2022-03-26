import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(100% - 1rem)",
    display: "flex",
    // "&:hover": {
    background: "#F7F7F7",
    // },
    padding: "1rem",
    borderRadius: "0.7rem",
    marginLeft: "1rem",
    marginRight: "1rem",
    marginBottom: "0.7rem",
  },
  messageBox: {
    flex: 1,
    // background: "#d1e0eb",
    borderRadius: "2rem",
    margin: "unset",
    padding: 0,
    paddingLeft: "1rem",
  },
  markdown: {
    wordBreak: "break-word",
  },
  user: {
    // background: "#0099ff",
    // color: "white",
    // boxShadow: "0 0.2rem 3rem -1.5rem rgba(0,0,0,0.34)",
    // margin: "1rem 0.5rem",
  },
  messageTitle: {
    display: "flex",
    alignItems: "center",
    // margin: "0.7rem 1rem 0.1rem",
  },
  senderName: {
    fontWeight: 700,
    fontSize: "1.1rem",
  },
  date: {
    alignItems: "center",
    margin: "0 0.8rem",
    color: "#aaa",
  },
}));

export default useStyles;
