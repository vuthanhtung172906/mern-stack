import {
  Button,
  InputAdornment,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";

import React from "react";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Formik, FastField, Form } from "formik";
import InputField from "../InputField";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loggin } from "../../features/Auth/userSlice";
import { setSnackbar } from "../../app/snackbarSlice";
import axios from "axios";
Authen.propTypes = {
  typeAuth: PropTypes.string,
  h1Auth: PropTypes.string,
  btnAuth: PropTypes.string,
  initialValue: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  handleOnsubmit: PropTypes.func.isRequired,
};
Authen.defaultProps = {
  typeAuth: "logIn",
  h1Auth: "Log In",
  btnAuth: "Log In",
};
const styles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    height: "auto",
    width: 380,
    minHeight: "500px",
    borderRadius: "20px",
    flexFlow: "column",
    alignItems: "center",
    "&:hover": {
      boxShadow: "3px 3px 25px 14px rgba(0,0,0,0.67)",
    },
  },
  h1: {
    fontSize: "2.1rem",
    fontWeight: "bold",
    fontFamily: "Pacifico",
  },
  form: {
    display: "flex",
    alignItems: "center",
    flexFlow: "column wrap",
    width: "300px",
    height: "auto",
    "& input": {
      margin: "10px 10px",
      width: "100%",
      padding: "10px",
      "&::placeholder": {
        fontSize: "10px",
      },
    },
    "& .MuiFormControl-root": {
      margin: "20px 0px",
    },
  },
  input: {
    margin: "",
  },
  btn: {
    width: "90%",
    backgroundImage:
      "linear-gradient(to right,  #614385 0%, #516395  51%, #614385  100%)",
    margin: "20px",
    padding: "10px auto",
    textAlign: "center",
    textTransform: "uppercase",
    transition: " 0.5s",
    backgroundSize: "200% auto",
    color: "white",
    boxShadow: "0 0 20px #eee",
    borderRadius: "20px",
    display: "block",
    "&:hover": {
      backgroundPosition:
        "right center" /* change the direction of the change here */,
      color: " #fff",
      textDecoration: "none",
    },
  },
}));

function Authen(props) {
  const classes = styles();
  const {
    handleOnsubmit,
    typeAuth,
    h1Auth,
    btnAuth,
    initialValue,
    validationSchema,
  } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const responseGoogle = async (response) => {
    console.log(response);
    try {
      const res = await axios.post("/user/google_login", {
        token_id: response.tokenId,
      });
      console.log(res);
      dispatch(loggin(true));
      localStorage.setItem("login", true);
      history.push("/");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Login success",
        })
      );
      return;
    } catch (error) {
      throw error;
    }
  };
  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      console.log(response);
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });
      console.log(res);
      dispatch(loggin(true));
      localStorage.setItem("login", true);
      history.push("/");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: "Login success",
        })
      );
      return;
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className={classes.root}>
      <Paper elevation={10} className={classes.paper}>
        <h1 className={classes.h1}>{h1Auth}</h1>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValue}
          onSubmit={(value) => handleOnsubmit(value)}
        >
          {(formikProps) => {
            return (
              <Form className={classes.form}>
                <FastField
                  typeAuth={typeAuth}
                  placeholder="Type your username"
                  label="UserName"
                  type="text"
                  name="username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  component={InputField}
                />
                <FastField
                  typeAuth={typeAuth}
                  placeholder="Type your email"
                  label="Email"
                  type="email"
                  name="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                  component={InputField}
                />
                <FastField
                  typeAuth={typeAuth}
                  placeholder="Type your password"
                  label="Password"
                  type="password"
                  name="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                  }}
                  component={InputField}
                />
                <FastField
                  typeAuth={typeAuth}
                  placeholder="Type your password"
                  label="Confirm Password"
                  type="password"
                  name="changepassword"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                  }}
                  component={InputField}
                />
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {btnAuth}
                </Button>
                <Typography
                  style={{
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                  component={NavLink}
                  to="/user/forgot-pass"
                >
                  {typeAuth === "forgotPass" || typeAuth === "signUp"
                    ? ""
                    : "Forgot Password ?"}
                </Typography>
                <Typography
                  style={{
                    fontSize: "12px",
                    textDecoration: "none",
                  }}
                  component={NavLink}
                  to="/user/sign-up"
                >
                  {typeAuth === "signUp" ? "" : "Create New User"}
                </Typography>{" "}
                <Typography
                  style={{
                    fontSize: "15px",
                    textDecoration: "none",
                    marginBottom: "20px",
                  }}
                  component={NavLink}
                  to="/user/sign-in"
                >
                  {typeAuth === "signUp" ? "Log In" : ""}
                </Typography>
              </Form>
            );
          }}
        </Formik>
        <GoogleLogin
          clientId="921062166610-l9p7nsavqn91nk5e3pcv5sip3p3cqr18.apps.googleusercontent.com"
          buttonText="Login with Goole"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <FacebookLogin
          appId="569554854239981"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </Paper>
    </div>
  );
}

export default Authen;
