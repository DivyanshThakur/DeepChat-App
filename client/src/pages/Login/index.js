import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "../../components/button/LoadingButton";
import { saveUserAuth } from "../../utils/userAuth";
import protectedHandler from "../../utils/protectedHandler";
import useStyles from "./style";
import { Button, Divider } from "@material-ui/core";
import { useLoginMutation } from "../../redux/api/auth";

const validationSchema = yup.object({
  email: yup.string("Enter your email").required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: protectedHandler(async (formData) => {
      const data = await login(formData).unwrap();
      saveUserAuth(data);
      history.push("/chats");
    }),
  });

  return (
    <div className={classes.root}>
      <Typography component="h3" variant="h3" className={classes.title}>
        Login
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          required
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          margin="normal"
          autoComplete="email"
          autoFocus
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          fullWidth
          required
          variant="outlined"
          margin="normal"
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          isLoading={isLoading}
        >
          Log In
        </LoadingButton>
        {/* <div className={classes.forgotPasswordLink}>
          <Link to="/auth/forgot-password">
            {"Did you forget your password?"}
          </Link>
        </div> */}
        <Divider />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.register}
          onClick={() => history.push("/auth/register")}
        >
          Create New Account
        </Button>
      </form>
    </div>
  );
};

export default Login;
