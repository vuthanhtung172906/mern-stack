import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,

  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  disable: PropTypes.bool,
  variant: PropTypes.string,
  InputProps: PropTypes.object,
  typeAuth: PropTypes.string,
  displayProps: PropTypes.bool,
};
InputField.defaultProps = {
  placeholder: "",
  label: "",
  type: "text",
  disable: false,
  variant: "standard",
  InputProps: null,
  typeAuth: "logIn",
  displayProps: false,
};
function InputField(props) {
  const {
    field,
    form,
    type,
    label,
    placeholder,
    disable,
    variant,
    InputProps,
    typeAuth,
    displayProps,
  } = props;
  let display = "inline-flex";
  if (typeAuth === "forgotPass" && type === "password") {
    display = "none";
  }
  if (
    typeAuth === "logIn" &&
    type === "password" &&
    label === "Confirm Password"
  ) {
    display = "none";
  }
  if (typeAuth !== "signUp" && type === "text") {
    display = "none";
  }
  if (typeAuth === "Reset" && type !== "password") {
    display = "none";
  }
  const { name } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <TextField
      style={{
        display: displayProps ? "inline-block" : display,
      }}
      label={label}
      variant={variant}
      id={label}
      {...field}
      placeholder={placeholder}
      type={type}
      disabled={disable}
      InputProps={InputProps}
      error={showError}
      helperText={errors[name]}
    />
  );
}

export default InputField;
