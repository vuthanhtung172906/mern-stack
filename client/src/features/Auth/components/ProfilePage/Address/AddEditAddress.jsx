import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Collapse,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import InputField from "../../../../../components/InputField";
import * as Yup from "yup";
import * as Sub from "sub-vn";
AddEditAddress.propTypes = {
  openDialog: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  hanleSubmitAddress: PropTypes.func.isRequired,
  initialValue: PropTypes.object,
  typeAddress: PropTypes.string,
  handleEditAddress: PropTypes.func,
};
AddEditAddress.defaultProps = {
  openDialog: false,
  initialValue: {
    fullname: "",
    number: "",
    address: "",
    addressMain: "",
  },
  typeAddress: "ADD",
};
const styles = makeStyles((theme) => ({
  root: {},
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      width: 700,
      maxWidth: 700,
    },
  },
  dialog__input: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 5,
    "& .MuiFormControl-root": {
      width: "50%",
      "& .MuiOutlinedInput-root": {
        width: "100%",
      },
    },
  },
  formControl: {
    width: "100%",
    margin: "20px auto",
  },
  formControl2: {
    width: "33%",
  },
  address__submit: {
    marginBottom: 20,
    padding: "10px 32px",
  },
}));

function AddEditAddress(props) {
  const classes = styles();
  const {
    openDialog,
    closeDialog,
    hanleSubmitAddress,
    initialValue,
    typeAddress,
    handleEditAddress,
  } = props;
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Please enter your name"),
    number: Yup.number().required("Please enter your telephone number"),
    address: Yup.string().required("Please enter your address"),
    addressMain: Yup.string().required("Please enter your address"),
  });

  const [province, setProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [ward, setWard] = React.useState("");
  const [openCollapse, setOpenCollapse] = useState(false);
  const handleClickOpenCollapse = () => {
    setOpenCollapse(!openCollapse);
  };
  const [address, setAddress] = useState({
    province: "",
    district: "",
    ward: "",
  });

  const handleChange = (event) => {
    setProvince(event.target.value);
    setDistrict("");
    setWard("");
    setAddress({
      province: event.target.value.name + ", ",
      district: "",
      ward: "",
    });
  };
  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
    setWard("");
    setAddress({
      ...address,
      district: event.target.value.name + ", ",
      ward: "",
    });
  };

  const handleChangeWard = (event) => {
    setAddress({
      ...address,
      ward: event.target.value.name,
    });
    setWard(event.target.value);
  };

  return (
    <Dialog open={openDialog} onClose={closeDialog} className={classes.dialog}>
      <DialogTitle>New Adress</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(value) => {
            if (typeAddress === "ADD") {
              hanleSubmitAddress(value);
            } else {
              handleEditAddress(value);
            }
          }}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className={classes.dialog__input}>
                  <FastField
                    name="fullname"
                    type="text"
                    variant="outlined"
                    label="Họ và Tên"
                    displayProps={true}
                    placeholder="Type your full name"
                    component={InputField}
                  />
                  <FastField
                    name="number"
                    type="tel"
                    variant="outlined"
                    label="SDT"
                    displayProps={true}
                    placeholder="SDT"
                    component={InputField}
                  />
                </div>

                <FormControl className={classes.formControl}>
                  <TextField
                    name="addressMain"
                    onChange={formikProps.handleChange}
                    error={
                      formikProps.touched.addressMain &&
                      Boolean(formikProps.errors.addressMain)
                    }
                    variant="outlined"
                    fullWidth
                    value={
                      (formikProps.values.addressMain = address.province
                        ? address.province + address.district + address.ward
                        : formikProps.values.addressMain)
                    }
                    placeholder="Tỉnh/Thành Phố , Quận/Huyện , Phường/Xã "
                    onClick={handleClickOpenCollapse}
                  />

                  <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                    <FormControl className={classes.formControl2}>
                      <InputLabel id="provinces">Tỉnh</InputLabel>
                      <Select
                        labelId="provinces"
                        id="getProvinces"
                        value={province}
                        onChange={handleChange}
                      >
                        {Sub.getProvinces().map((state) => (
                          <MenuItem key={state.code} value={state}>
                            {state.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl2}>
                      <InputLabel id="district">Huyện</InputLabel>
                      <Select
                        labelId="district"
                        value={district}
                        onChange={handleChangeDistrict}
                      >
                        {Sub.getDistrictsByProvinceCode(province.code).map(
                          (state) => (
                            <MenuItem key={state.code} value={state}>
                              {state.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl2}>
                      <InputLabel id="wards">Xã</InputLabel>
                      <Select
                        labelId="wards"
                        value={ward}
                        onChange={handleChangeWard}
                      >
                        {Sub.getWardsByDistrictCode(district.code).map(
                          (state) => (
                            <MenuItem key={state.code} value={state}>
                              {state.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Collapse>
                  <TextField
                    fullWidth
                    name="address"
                    onChange={formikProps.handleChange}
                    error={
                      formikProps.touched.address &&
                      Boolean(formikProps.errors.address)
                    }
                    helperText={
                      formikProps.touched.address &&
                      Boolean(formikProps.errors.address)
                    }
                    value={formikProps.values.address}
                    style={{ margin: "20px auto" }}
                    placeholder="Địa chỉ cụ thể"
                    variant="outlined"
                  />
                </FormControl>
                <Button
                  className={classes.address__submit}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default AddEditAddress;
