import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "0.3rem 0.5rem",
    width: "unset",
    borderRadius: "1rem",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
  },
  userBox: {
    width: "100%",
  },
  avatar: {
    height: "2.8rem",
    width: "2.8rem",
    border: "0.01rem solid rgba(0, 0, 0, 0.1)",
  },
  name: {
    fontSize: "1.25rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
    width: "16rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  md: {
    fontSize: "0.8rem",
    color: "rgba(0, 0, 0, .7)",
    whiteSpace: "nowrap",
    width: "15rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default useStyles;
