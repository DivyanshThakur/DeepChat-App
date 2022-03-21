import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "1rem",
    marginBottom: "0.5rem",
  },

  cancelButton: {
    height: "2.25rem",
    width: "5.625rem",
  },
  saveButton: {
    height: "2.25rem",
    width: "5.625rem",
    marginLeft: "0.5rem",
  },
}));

export default useStyles;
