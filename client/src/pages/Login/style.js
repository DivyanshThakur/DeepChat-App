import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "4rem 2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      margin: "0rem 1rem 1rem 1rem",
      padding: "2rem",
      backgroundColor: "white",
      borderRadius: "0.5rem",
      height: "100%",
      maxWidth: "25rem",
    },
  },
  title: {
    fontStyle: "normal",
    fontWeight: 500,
    color: theme.palette.primary.main,
    marginBottom: "0.625rem",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: "0.5rem",
  },
  forgotPasswordLink: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "1rem",
    "& a": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
    "& a:hover": {
      opacity: "0.8",
    },
  },
  submit: {
    margin: "1.5rem 0rem 1rem",
    height: "3.5rem",
  },
  register: {
    backgroundImage: "linear-gradient(rgba(0, 255, 0, 0.8) 0 0)",
    color: "white",
    height: "3.5rem",
    margin: "1.5rem 0rem 1rem",
    "&:hover": {
      backgroundImage: "linear-gradient(rgba(0, 255, 0, 0.6) 0 0)",
    },
  },
}));

export default useStyles;
