import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage:
      "linear-gradient(to right top, #8321ff, #7233fe, #603ffd, #4c47fa, #364ef7, #255bfa, #1366fb, #0070fc, #0082ff, #0093ff, #00a2ff, #3ab1ff)",
    overflowY: "auto",
    [theme.breakpoints.up("lg")]: {
      overflow: "hidden",
    },
  },
  board: {
    maxWidth: "37.5rem !important",
    margin: "auto",
    padding: "2.5rem !important",
  },
  logo: {
    height: "12rem",
    width: "12rem",
    borderRadius: "50%",
    boxShadow: "0 0.4rem 2rem rgba(0, 0, 0, 0.25)",
    marginRight: "2rem",
    [theme.breakpoints.down("md")]: {
      height: "6rem",
      width: "6rem",
      margin: "1.5rem",
    },
  },
  appNameBox: {
    margin: "auto 0",
  },
  title: {
    fontSize: "2.6rem",
    fontWeight: 700,
    fontFamily: "cursive",
    color: "white",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
  },
  subHeading: {
    fontSize: "1.1rem",
    color: "rgba(255,255,255, .75)",
    textAlign: "end",
    // fontFamily: "Itim",
    fontWeight: 400,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
  },
  paper: {
    display: "flex",
    alignItems: "center",
    backgroundImage: `linear-gradient(
      to right top,
      #f0f0f0,
      #f4f4f4,
      #f7f7f7,
      #fbfbfb,
      #ffffff
    )`,
    boxShadow: "0 0rem 5rem rgba(0, 0, 0, 0.6)",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
