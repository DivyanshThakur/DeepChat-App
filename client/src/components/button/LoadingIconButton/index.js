import React from "react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingIconButton = ({
  isLoading,
  icon,
  children,
  startIcon = true,
  loaderColor = "white",
  ...props
}) => {
  return (
    <Button
      {...props}
      startIcon={
        startIcon ? (
          isLoading ? (
            <CircularProgress
              style={{
                height: "0.9375rem",
                width: "0.9375rem",
                color: loaderColor,
              }}
            />
          ) : (
            icon
          )
        ) : undefined
      }
      endIcon={
        !startIcon ? (
          isLoading ? (
            <CircularProgress
              style={{
                height: "0.9375rem",
                width: "0.9375rem",
                color: loaderColor,
              }}
            />
          ) : (
            icon
          )
        ) : undefined
      }
    >
      {children}
    </Button>
  );
};

export default LoadingIconButton;
