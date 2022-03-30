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
    border: "0.01rem solid rgba(0, 0, 0, 0.1)",
    padding: "0.3rem 1rem",
    borderRadius: "4rem",
    alignItems: "center",
    margin: "2rem 0",
    background: "#fff",
    boxShadow: "0 0.4rem 2rem -0.6rem rgba(0, 0, 0, 0.4)",
  },
}));

export default useStyles;
