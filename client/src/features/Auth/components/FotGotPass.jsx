import React from "react";
import Authen from "../../../components/Auth";
import * as Yup from "yup";
import UserApi from "../../../api/userApi";
import { useDispatch } from "react-redux";
import { setSnackbar } from "../../../app/snackbarSlice";

const initialValue = {
  email: "",
};
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Please enter Email"),
});
function FotGotPass(props) {
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    console.log(values);
    try {
      const res = await UserApi.forgotPass(values);
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
      typeAuth="forgotPass"
      h1Auth="Forgot Password"
      btnAuth="Get New Password"
      initialValue={initialValue}
      validationSchema={validationSchema}
      handleOnsubmit={onSubmit}
    />
  );
}

export default FotGotPass;
