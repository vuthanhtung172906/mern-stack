import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Chip,
  FormControlLabel,
  makeStyles,
  Typography,
  Switch,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

import { useDispatch, useSelector } from "react-redux";
import UserApi from "../../../../../api/userApi";
import { getInforUserThunk } from "../../../userSlice";
import AddEditAddress from "./AddEditAddress";
Address.propTypes = {
  openDialog: PropTypes.bool,
};
Address.defaultProps = {
  openDialog: false,
};
const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column wrap",
    padding: 20,
  },
  address__top: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
  },
  address__list__item: {
    height: 195,
    padding: "30px 30px 20px 3px",
    borderBottom: "1px solid rgb(239,239,239) ",
    display: "flex",
    justifyContent: "space-between",
  },
  address__list__item__line: {
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
  },
  address__list__item__line__first: {
    width: 160,
    textAlign: "right",
    marginRight: 15,
    fontSize: 14,
    fontWeight: 400,
    color: "rgba(85, 85, 85, 0.8)",
    lineHeight: "17px",
  },
  address__list__item__line__second: {
    fontSize: 14,
    fontWeight: 400,
    color: "rgba(0, 0, 0, 0.8)",
    lineHeight: "17px",
  },
  "& .address__list__item__first": {
    flex: 1,
  },
  address__list__item__editdel: {},
}));

function Address(props) {
  const classes = styles();
  const [openDialog, setOpenDialog] = useState(false);
  const handleAddAdress = () => {
    setTypeAddress("ADD");
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };

  const listAddress = useSelector((state) => state.auth.user.address);
  const token = useSelector((state) => state.token.accesstoken);
  const dispatch = useDispatch();
  const hanleSubmitAddress = async (value) => {
    try {
      console.log(value);
      const addRole = {
        ...value,
        role: false,
      };

      const newAddress = [...listAddress, addRole];
      await UserApi.updateAddress(newAddress, token);
      await dispatch(getInforUserThunk(token));
      setOpenDialog(false);
    } catch (error) {
      throw error;
    }
  };
  const [indexEdit, setindexEdit] = useState(null);
  const [typeAddress, setTypeAddress] = useState("add");
  const handleEditAddress = (event, index, state) => {
    setValueDialog({
      fullname: state.fullname,
      address: state.address,
      addressMain: state.addressMain,
      number: state.number,
    });
    setTypeAddress("edit");
    setindexEdit(index);
    setOpenDialog(true);
  };
  const handleSubmitEditAddress = async (value) => {
    try {
      const newAddress = listAddress.map((state, thisindex) => {
        const newState =
          indexEdit === thisindex
            ? { ...value, role: false }
            : { ...state, role: false };
        return newState;
      });
      console.log({ newAddress });
      await UserApi.updateAddress(newAddress, token);
      await dispatch(getInforUserThunk(token));
      setTypeAddress("add");
      setOpenDialog(false);
    } catch (error) {
      throw error;
    }
  };
  const handleChangeAddressDefault = async (event, index) => {
    try {
      const newAddress = listAddress.map((state, thisindex) => {
        const newState = {
          ...state,
          role: thisindex === index ? true : false,
        };
        return newState;
      });

      await UserApi.updateAddress(newAddress, token);
      await dispatch(getInforUserThunk(token));
    } catch (error) {
      throw error;
    }
  };
  const handleDelAddress = async (event, index) => {
    try {
      const newAddress = listAddress.filter((state, indexList) => {
        return indexList !== index;
      });
      await UserApi.updateAddress(newAddress, token);
      await dispatch(getInforUserThunk(token));
    } catch (error) {
      throw error;
    }
  };
  const [valueDialog, setValueDialog] = useState({
    fullname: "",
    number: "",
    address: "",
    addressMain: "",
  });

  return (
    <div className={classes.root}>
      <div className={classes.address__top}>
        <Typography variant="h5">Your Address</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAdress}
          className={classes.address__top__btn}
        >
          Add Address
        </Button>
        <AddEditAddress
          handleEditAddress={handleSubmitEditAddress}
          typeAddress={typeAddress}
          initialValue={valueDialog}
          openDialog={openDialog}
          closeDialog={closeDialog}
          hanleSubmitAddress={hanleSubmitAddress}
        />
      </div>
      <div className={classes.address__list}>
        {listAddress.map((state, index) => (
          <div className={classes.address__list__item} key={index}>
            <div className="address__list__item__first">
              <div
                className={classes.address__list__item__line}
                style={{ marginBottom: 15 }}
              >
                <Typography
                  className={classes.address__list__item__line__first}
                >
                  Họ và tên
                </Typography>{" "}
                <span
                  className={classes.address__list__item__line__second}
                  style={{ fontSize: 16, lineHeight: "19px" }}
                >
                  {" "}
                  {state.fullname}
                  {
                    <Chip
                      style={{
                        display: state.role ? "inline-flex" : "none",
                        marginLeft: 20,
                      }}
                      size="small"
                      color="secondary"
                      icon={<DoneIcon />}
                      label="Mặc định"
                    />
                  }
                </span>
              </div>
              <div
                className={classes.address__list__item__line}
                style={{ marginBottom: 10 }}
              >
                <Typography
                  className={classes.address__list__item__line__first}
                >
                  Số Điện Thoại{" "}
                </Typography>{" "}
                <span className={classes.address__list__item__line__second}>
                  {" "}
                  {state.number}{" "}
                </span>
              </div>
              <div
                className={classes.address__list__item__line}
                style={{ alignItems: "flex-start" }}
              >
                <Typography
                  className={classes.address__list__item__line__first}
                >
                  Địa chỉ
                </Typography>{" "}
                <span
                  className={classes.address__list__item__line__second}
                  style={{ wordBreak: "break-word" }}
                >
                  {state.address} <br /> {state.addressMain}{" "}
                </span>
              </div>
            </div>

            <div className={classes.address__list__item__editdel}>
              <div className="editdel">
                <Button
                  onClick={(event) => handleEditAddress(event, index, state)}
                >
                  Sửa
                </Button>
                <Button onClick={(event) => handleDelAddress(event, index)}>
                  Xóa
                </Button>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    checked={state.role}
                    disabled={state.role}
                    onChange={(event) =>
                      handleChangeAddressDefault(event, index)
                    }
                    name={`check${index}`}
                  />
                }
                label="Đặt làm mặc định"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Address;
