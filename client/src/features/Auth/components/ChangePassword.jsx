import React from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import * as Yup from "yup";
import UserApi from "../../../api/userApi";
import { setSnackbar } from "../../../app/snackbarSlice";
import Authen from "../../../components/Auth";
const validationSchema = Yup.object().shape({
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
  password: "",
  changepassword: "",
};

function ChangePassword(props) {
  const history = useHistory();

  const dispatch = useDispatch();
  const { token } = useParams();
  const onSubmit = async (values) => {
    try {
      const password = values.password;
      const res = await UserApi.resetPass({ password }, token);
      history.push("/user/sign-in");
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: res.msg,
        })
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <Authen
      typeAuth="Reset"
      h1Auth="Reset Password"
      btnAuth="Submit"
      initialValue={initialValue}
      validationSchema={validationSchema}
      handleOnsubmit={onSubmit}
    />
  );
}

export default ChangePassword;
