import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import UserApi from "../../../api/userApi";
import { setSnackbar } from "../../../app/snackbarSlice";

Activation.propTypes = {};

function Activation(props) {
  const { activation_token } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await UserApi.activation({ activation_token });
          console.log(res);
          history.push("/");
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
      activationEmail();
    }
  }, [activation_token, dispatch, history]);
  console.log({ activation_token });
  return <div>Loading.........</div>;
}

export default Activation;
