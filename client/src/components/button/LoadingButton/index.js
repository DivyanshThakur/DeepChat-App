import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <Button disableFocusRipple {...props}>
      {isLoading ? <CircularProgress style={{ color: "white" }} /> : children}
    </Button>
  );
};

export default LoadingButton;
