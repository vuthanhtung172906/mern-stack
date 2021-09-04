import React from "react";
import Authen from "../../../components/Auth";
import * as Yup from "yup";
import UserApi from "../../../api/userApi";
import { useDispatch } from "react-redux";
import { loggin } from "../userSlice";
import { useHistory } from "react-router";
import { setSnackbar } from "../../../app/snackbarSlice";

const initialValue = {
  email: "",
  password: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter Email"),
  password: Yup.string().required("Please enter password"),
});
function LogIn(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async (values) => {
    try {
      const res = await UserApi.login(values);
      if (res.msg === "Login success") {
        const action = loggin(true);
        localStorage.setItem("login", true);
        dispatch(action);
        history.push("/");
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "success",
            snackbarMessage: res.msg,
          })
        );
        return;
      }
      const action = setSnackbar({
        snackbarOpen: true,
        snackbarType: "error",
        snackbarMessage: res.msg,
      });
      dispatch(action);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <Authen
      typeAuth="logIn"
      h1Auth="Log In"
      btnAuth="Log In"
      initialValue={initialValue}
      validationSchema={validationSchema}
      handleOnsubmit={onSubmit}
    />
  );
}

export default LogIn;
