import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  slateContainer: {
    margin: "1rem",
    marginBottom: "1.5rem",
    border: "0.01rem solid rgba(0,0,0,0.1)",
    padding: "0.7rem",
    width: "calc(100% - 2rem)",
    maxWidth: "calc(100vw - 24rem)",
    minWidth: "22rem",
    // boxShadow: "0 0.2rem 3rem -1.5rem rgba(0,0,0,0.8)",
    borderRadius: "1.25rem",
    backgroundImage: `linear-gradient(
    to right top,
    #f0f0f0,
    #f4f4f4,
    #f7f7f7,
    #fbfbfb,
    #ffffff
  )`,
    boxShadow: "0 16px 40px -12.125px rgba(0,0,0,0.3)",
  },
  editable: {
    maxHeight: "25rem",
    overflowY: "auto",
    margin: "0.5rem 0",
    // overflowX: "none",
  },
  divider: {
    height: "1.5rem",
    borderLeft: "1px solid rgba(0,0,0,0.5)",
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
