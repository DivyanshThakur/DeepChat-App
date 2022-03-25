import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowY: "auto",
    position: "relative",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  dateMessage: {
    border: "0.1rem solid black",
    padding: "0.3rem 1rem",
    borderRadius: "4rem",
    alignItems: "center",
    marginBottom: "1rem",
  },
  goDown: {
    position: "fixed",
    bottom: "11rem",
    right: "2rem",
  },
}));

export default useStyles;
