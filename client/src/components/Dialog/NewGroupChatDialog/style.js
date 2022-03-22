import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    [theme.breakpoints.up("md")]: {
      minWidth: "50rem !important",
    },
  },
  grid: {
    marginTop: "1rem",
  },
  title: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    fontWeight: 700,
  },
  divider: {
    marginTop: "1.5rem",
    marginBottom: "0.5rem",
  },
  search: {
    margin: "auto",
    width: "100%",
  },
  form: {
    padding: "1rem",
  },
  text: {
    marginTop: "1rem",
    fontSize: "1.2rem",
    fontWeight: 500,
  },
  paper: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    marginTop: "1rem",
    maxHeight: "18rem",
    overflow: "auto",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  userList: {
    padding: "1rem",
  },
}));

export default useStyles;
