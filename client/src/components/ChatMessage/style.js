import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    // color: "white",
    [theme.breakpoints.down("md")]: {
      fontSize: "2rem",
    },
  },
  subHeading: {
    fontSize: "1.1rem",
    // color: "rgba(255,255,255, .75)",
    textAlign: "end",
    // fontFamily: "Itim",
    fontWeight: 400,
    [theme.breakpoints.down("md")]: {
      fontSize: "0.8rem",
    },
  },
 
}));

export default useStyles;
