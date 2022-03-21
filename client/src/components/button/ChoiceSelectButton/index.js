import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const ChoiceSelectButton = ({
  values,
  onClick,
  selectedIndex,
  disableFrom,
  classes,
}) => {
  return (
    <Box className={classes.root}>
      {values.map((value, index) => {
        return (
          <Button
            key={index}
            variant={selectedIndex === index ? "contained" : "outlined"}
            color={selectedIndex === index ? "primary" : undefined}
            className={classes.button}
            onClick={() => onClick(index)}
            disabled={disableFrom ? index >= disableFrom : false}
          >
            {value}
          </Button>
        );
      })}
    </Box>
  );
};

export default ChoiceSelectButton;
