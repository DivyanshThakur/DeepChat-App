import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "rgba(0, 0, 0, .04)",
    borderRadius: "4rem",
    height: "2.3rem",
    margin: "0 0.5rem 0.5rem",
    padding: "1rem",
  },
  input: {
    fontSize: "0.3rem",
  },
  adornedStart: {
    "& > *:first-child": {
      // * is the icon at the beginning of input
      fontSize: "1.25rem",
      color: theme.palette.grey[500],
      marginRight: "1rem",
    },
    "& > *:last-child": {
      fontSize: "1.25rem",
      color: theme.palette.grey[700],
    },
  },
}));

export default useStyles;
