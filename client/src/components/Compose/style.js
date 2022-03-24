import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
    border: "0.05rem solid black",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    position: "fixed",
    width: "calc(100% - 25rem)",
    bottom: 0,
    minWidth: "22rem",
  },
  editable: {
    maxHeight: "30rem",
    overflow: "auto",
  },
  divider: {
    height: "1.5rem",
    borderLeft: "1px solid black",
    margin: "auto 0.4rem",
  },
  sendButton: {
    alignSelf: "center",
    marginLeft: "auto",
  },
  atList: {
    "&:hover": {
      color: "blue",
    },
  },
  emojiPicker: {
    position: "absolute",
    bottom: "2rem",
    left: "0rem",
  },
  mention: {
    border: "1px solid black",
    zIndex: 45,
    bottom: "45rem",
    position: "absolute",
  },
}));

export default useStyles;
