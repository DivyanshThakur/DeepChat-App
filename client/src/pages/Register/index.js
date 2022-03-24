import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import LoadingButton from "../../components/button/LoadingButton";
import { saveUserAuth } from "../../utils/userAuth";
import protectedHandler from "../../utils/protectedHandler";
import { Box, Button, Divider } from "@material-ui/core";
import AvatarUploader from "../../components/AvatarUploader";
import { useRegisterMutation } from "../../redux/api/auth";
import useStyles from "./style";

const validationSchema = yup.object({
  name: yup.string("Enter your Name").required("Name is required"),
  email: yup.string("Enter your email").required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [register, { isLoading }] = useRegisterMutation();
  const [avatar, setAvatar] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: protectedHandler(async (values) => {
      const data = await register({ ...values, image: avatar }).unwrap();

      saveUserAuth(data);

      history.push("/chats");
    }),
  });

  return (
    <div className={classes.root}>
      <Typography component="h3" variant="h3" className={classes.title}>
        Register
      </Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Box display="flex" justifyContent="center">
          <AvatarUploader size={120} image={avatar} onChange={setAvatar} />
        </Box>
        <Box className={classes.box}>
          <TextField
            className={classes.textField}
            required
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            margin="normal"
            autoComplete="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            className={classes.textField}
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
            className={classes.textField}
            required
            variant="outlined"
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            className={classes.textField}
            required
            variant="outlined"
            margin="normal"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Box>
        <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
          isLoading={isLoading}
        >
          Register
        </LoadingButton>
        <Divider />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.register}
          onClick={() => history.push("/auth/login")}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Register;
