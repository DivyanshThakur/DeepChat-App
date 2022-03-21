import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import InfoSvg from "../../../assets/InfoSvg";
import useStyles from "./style";

const InfoButton = ({ text, fill = "black", position = "right" }) => {
  const classes = useStyles();

  const Info = React.forwardRef(function Info(props, innerRef) {
    return <InfoSvg innerRef={innerRef} {...props} />;
  });

  return (
    <Tooltip title={text} placement={position}>
      <Info fill={fill} className={classes.root} />
    </Tooltip>
  );
};

export default InfoButton;
