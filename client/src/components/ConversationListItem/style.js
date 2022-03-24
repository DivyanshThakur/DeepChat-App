import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "21rem",
    marginTop: "1.5rem",
    marginBottom: "0.5rem",
    border: "0.0625rem solid #E5E5E5",
    borderRadius: "0.75rem",
    overflow: "auto",
    boxShadow: "0rem 0.3125rem 2.5rem -0.625rem rgba(0,0,0,0.14)",
    backgroundImage: `linear-gradient(
      to right top,
      #f0f0f0,
      #f4f4f4,
      #f7f7f7,
      #fbfbfb,
      #ffffff
    )`,
  },
  userBox: {
    width: "100%",
  },
  avatar: {
    border: "0.05rem solid black",
    height: "2.8rem",
    width: "2.8rem",
  },
  name: {
    fontSize: "1.25rem",
    fontWeight: 500,
    whiteSpace: "nowrap",
    width: "15rem",
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
  emptyMessage: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    color: "rgba(0, 0, 0, 0.5)",
  },
}));

export default useStyles;
