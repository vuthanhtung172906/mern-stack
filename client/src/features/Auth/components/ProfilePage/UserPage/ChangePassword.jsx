import React from "react";
import { FastField, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button, makeStyles } from "@material-ui/core";
import InputField from "../../../../../components/InputField";
import UserApi from "../../../../../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setSnackbar } from "../../../../../app/snackbarSlice";
ChangePassword.propTypes = {};
const initialValue = {
  oldpass: "",
  password: "",
  changepassword: "",
};
const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: 250,
    margin: "20px auto",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
    "& input": {
      margin: "10px 10px",
      width: "100%",
      padding: "10px",
      "&::placeholder": {
        fontSize: "10px",
      },
    },
    "& .MuiFormControl-root": {
      margin: "10px 0px",
    },
  },
}));
function ChangePassword(props) {
  const dispatch = useDispatch();
  const validateSchema = Yup.object().shape({
    oldpass: Yup.string().required("Please enter the old password"),
    password: Yup.string().required("This field is required"),
    changepassword: Yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
  });
  const token = useSelector((state) => state.token.accesstoken);
  const classes = styles();
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const newPass = {
        oldPassword: values.oldpass,
        newPassword: values.password,
      };
      const res = await UserApi.changePass(newPass, token);
      if (res.msg === "Old password is incorrect") {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: res.msg,
          })
        );
      } else {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: res.msg,
          })
        );
      }

      console.log(res);
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <Formik
        initialValues={initialValue}
        validationSchema={validateSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form className={classes.root}>
          <FastField
            name="oldpass"
            type="password"
            component={InputField}
            placeholder="Enter old pass"
            label="Password"
            displayProps={true}
            variant="outlined"
          />
          <FastField
            name="password"
            type="password"
            label="New Password"
            displayProps={true}
            component={InputField}
            placeholder="Enter new pass"
            variant="outlined"
          />
          <FastField
            name="changepassword"
            type="password"
            label="Confirm Password"
            displayProps={true}
            component={InputField}
            placeholder="Enter confirm pass"
            variant="outlined"
          />
          <Button type="submit" variant="outlined" color="primary">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default ChangePassword;
