import { makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import UserApi from "../../../../../api/userApi";

PaymentResult.propTypes = {};
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "800px",
    minHeight: "500px",
    margin: "100px auto",
    display: "flex",
    justifyContent: "center",
    flexFlow: "column wrap",
    alignItems: "center",
  },
}));
function PaymentResult(props) {
  const query = useQuery();
  const classes = useStyles();
  const status = query.get("vnp_ResponseCode");
  const paymentID = query.get("vnp_OrderInfo");
  const token = useSelector((state) => state.token.accesstoken);
  useEffect(() => {
    try {
      if (status === "00") {
        const editStatus = async () => {
          const res = await UserApi.editStatus(paymentID, status, token);
          console.log(res);
        };
        editStatus();
      }
    } catch (error) {
      throw error;
    }
  }, [status, paymentID, token]);
  if (status === "00") {
    return (
      <Paper elevation={7} className={classes.root}>
        <h1>THANH TOÁN THÀNH CÔNG</h1> <br />
        <h2>KIỂM TRA LẠI ĐƠN HÀNG TRONG LỊCH SỬ </h2>
      </Paper>
    );
  } else {
    return (
      <Paper elevation={7} className={classes.root}>
        <h1>THANH TOÁN THẤT BẠI</h1> <br />
        <h2>VUI LÒNG KIỂM TRA LẠI TÀI KHOẢN</h2>
      </Paper>
    );
  }
}

export default PaymentResult;
