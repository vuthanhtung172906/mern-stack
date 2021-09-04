import React from "react";
import Authen from "../../../components/Auth";
import * as Yup from "yup";
import UserApi from "../../../api/userApi";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../app/snackbarSlice";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Please enter Username"),
  email: Yup.string().email().required("Please enter Email"),
  password: Yup.string()
    .required("Please enter password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "password must have one uppercase one lowercase one number and one special character "
    ),
  changepassword: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
});

const initialValue = {
  username: "",
  email: "",
  password: "",
  changepassword: "",
};
function SignUp(props) {
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      const res = await UserApi.register(values);
      console.log(res);
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: res.msg,
        })
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <Authen
      typeAuth="signUp"
      h1Auth="Sign Up"
      btnAuth="Create Account"
      initialValue={initialValue}
      validationSchema={validationSchema}
      handleOnsubmit={onSubmit}
    />
  );
}

export default SignUp;
