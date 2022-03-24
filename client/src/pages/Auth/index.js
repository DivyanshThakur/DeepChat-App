import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import { Container, Typography } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import ChatLogo from "../../assets/chatLogo.jpg";
// import ForgotPassword from "../ForgotPassword";
// import ResetPassword from "../ResetPassword";
// import ValidateOTP from "../ValidateOTP";
import Login from "../Login";
import useStyles from "./styles";
import Register from "../Register";

const Auth = () => {
  const classes = useStyles();
  const { path } = useRouteMatch();
  const canShowLogoOnMobile = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <Grid container className={classes.root}>
      <Hidden only={["xs", "sm", "md"]}>
        <Container disableGutters className={classes.board}>
          <Box display="flex" justifyContent="center">
            <img
              src={ChatLogo}
              alt="DeepChat App Logo"
              className={classes.logo}
            />
            <Box className={classes.appNameBox}>
              <Typography className={classes.title}>DeepChat App</Typography>
              <Typography className={classes.subHeading}>
                Chatting that never ends.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Hidden>
      <Grid
        item
        className={classes.paper}
        xs={12}
        sm={12}
        md={12}
        lg={5}
        component={Paper}
        elevation={6}
        square
      >
        {canShowLogoOnMobile ? (
          <img
            src={ChatLogo}
            alt="History Diaries Logo"
            className={classes.logo}
          />
        ) : null}
        <Switch>
          <Route exact path={`${path}/login`} component={Login} />
          <Route exact path={`${path}/register`} component={Register} />
          {/* <Route
            exact
            path={`${path}/forgot-password`}
            component={ForgotPassword}
          />
          <Route
            exact
            path={`${path}/validate-otp/:resetToken`}
            component={ValidateOTP}
          />
          <Route
            exact
            path={`${path}/reset-password/:resetToken`}
            component={ResetPassword}
          /> */}
          <Redirect to={`${path}/login`} />
        </Switch>
      </Grid>
    </Grid>
  );
};

export default Auth;
