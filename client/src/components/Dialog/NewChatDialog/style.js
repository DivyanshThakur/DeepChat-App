import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    minWidth: "25rem !important",
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
}));

export default useStyles;
