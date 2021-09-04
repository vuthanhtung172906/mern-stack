import {
  Button,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Radio,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import DoneIcon from "@material-ui/icons/Done";
import UserApi from "../../../../../api/userApi";
import { addCart2, getInforUserThunk } from "../../../userSlice";
import { setSnackbar } from "../../../../../app/snackbarSlice";
import AddEditAddress from "../Address/AddEditAddress";

// import PropTypes from "prop-types";

Payment.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1000px",
    margin: "80px auto",
    display: "flex",
    flexFlow: "column wrap",
  },
  address: {
    padding: "20px",
  },
  utils: {
    height: "3px",
    width: "100%",
    "background-position-x": " -30px",
    "background-size": "116px 3px",
    "background-image":
      "repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px)",
    marginBottom: "20px",
  },
  titleAddress: {
    color: "#ee4d2d",
    display: "flex",
    flexFlow: "row wrap",
    fontSize: "18px",
    marginBottom: "20px",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  chooseAddress: {},
  address_fullnamenumber: {
    fontWeight: 700,
    color: "#222",
    fontSize: "1rem",
    display: "inline-block",
    marginRight: "40px",
  },
  address_descrip: {
    display: "inline-block",
    fontSize: "1rem",
    marginRight: "15px",
  },
  listproduct: {
    marginTop: "10px",
    padding: 20,
  },
  listproduct_item: {
    listStyleType: "none",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
  },
  listproduct_item__img: {
    width: 40,
    height: 40,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  method: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "10px 30px",
    borderBottom: "1px solid #F1F0ED",
  },
  method__title: {
    fontSize: "18px",
    color: "#222222",
    marginRight: 20,
  },
  content: {
    padding: "28px 30px",
  },
}));
function Payment(props) {
  const location = useLocation();
  const history = useHistory();
  const { product, total } = location.state;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const address = useSelector((state) => state.auth.user.address);
  const token = useSelector((state) => state.token.accesstoken);
  const [openChangeAddress, setOpenChangeAddress] = useState(false);
  const [changeAddress, setChangeAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const hanleSubmitAddress = async (value) => {
    try {
      console.log(value);
      const addRole = {
        ...value,
        role: false,
      };

      const newAddress = [...address, addRole];
      await UserApi.updateAddress(newAddress, token);
      await dispatch(getInforUserThunk(token));
      setOpenDialog(false);
    } catch (error) {
      throw error;
    }
  };
  const handleSetPrePay = () => {
    setPaymentMethod(true);
  };
  const handleSetPostpaid = () => {
    setPaymentMethod(false);
  };
  const handleChangeAddress = (index) => {
    setChangeAddress(index);
  };
  useEffect(() => {
    address.forEach((item, index) => {
      if (item.role) {
        setDeliveryAddress({ item, index });
      }
    });
  }, [address]);
  useEffect(() => {
    if (deliveryAddress) {
      setChangeAddress(deliveryAddress.index);
    }
  }, [deliveryAddress]);
  const handleOpenChange = () => {
    setOpenChangeAddress(true);
  };
  const handleSaveChangeAddress = () => {
    address.forEach((item, index) => {
      if (changeAddress === index) {
        setDeliveryAddress({ item, index });
      }
    });
    setOpenChangeAddress(false);
  };
  const handleSubmitPayment = async () => {
    const listproduct = [];
    const address = deliveryAddress.item;
    const newcart = [];
    product.forEach((item, index) => {
      if (item.check) {
        listproduct.push(item);
      } else {
        newcart.push(item);
      }
    });
    dispatch(addCart2(newcart));
    await UserApi.addCart(newcart, token);
    if (paymentMethod) {
      try {
        const typePay = "Thanh toan online";
        const res = await UserApi.requestPayment(
          total,
          address,
          listproduct,
          typePay,
          token
        );
        window.location.href = res.msg;
      } catch (error) {
        throw error;
      }
    } else {
      const typePay = "Thanh toan khi nhận hàng.";
      const res = await UserApi.createPayPaid(
        total,
        address,
        listproduct,
        typePay,
        token
      );
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: "success",
          snackbarMessage: res.msg,
        })
      );
      history.push("/");
    }
  };
  return (
    <div className={classes.root}>
      <Paper elevation={7}>
        <div className={classes.address}>
          <div className={classes.utils}></div>
          <div className={classes.titleAddress}>
            <svg
              style={{
                color: "#ee4d2d",
                width: 12,
                height: 16,
                fill: "currentColor",
                marginRight: 5,
              }}
            >
              <path
                d="M6 3.2c1.506 0 2.727 1.195 2.727 2.667 0 1.473-1.22 2.666-2.727 2.666S3.273 7.34 3.273 5.867C3.273 4.395 4.493 3.2 6 3.2zM0 6c0-3.315 2.686-6 6-6s6 2.685 6 6c0 2.498-1.964 5.742-6 9.933C1.613 11.743 0 8.498 0 6z"
                fillRule="evenodd"
              ></path>
            </svg>
            <span> Địa chỉ nhận hàng</span>
            <Button onClick={handleOpenDialog}>Thêm Địa Chỉ</Button>
            <Button onClick={handleOpenChange}>Thay Đổi</Button>
            <AddEditAddress
              openDialog={openDialog}
              closeDialog={closeDialog}
              hanleSubmitAddress={hanleSubmitAddress}
            />
          </div>
          <div className={classes.chooseAddress}>
            <div style={{ display: openChangeAddress ? "none" : "block" }}>
              {deliveryAddress ? (
                <div>
                  <div className={classes.address_fullnamenumber}>
                    {deliveryAddress.item.fullname}(
                    {deliveryAddress.item.number})
                  </div>
                  <div className={classes.address_descrip}>
                    {deliveryAddress.item.address}{" "}
                    {deliveryAddress.item.addressMain}
                  </div>
                  {deliveryAddress.item.role ? (
                    <Chip
                      size="small"
                      style={{ marginRight: 20 }}
                      color="secondary"
                      icon={<DoneIcon />}
                      label="Mặc định"
                    />
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
            <div style={{ display: openChangeAddress ? "block" : "none" }}>
              {address.map((state, index) => {
                return (
                  <div key={index}>
                    <Radio
                      onChange={() => handleChangeAddress(index)}
                      checked={changeAddress === index}
                    />
                    <div className={classes.address_fullnamenumber}>
                      {state.fullname} {state.number}
                    </div>
                    <div className={classes.address_descrip}>
                      {state.address} {state.addressMain}
                    </div>
                    {state.role ? (
                      <Chip
                        size="small"
                        style={{ marginRight: 20 }}
                        color="secondary"
                        icon={<DoneIcon />}
                        label="Mặc định"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              <div>
                <Button onClick={handleSaveChangeAddress}>Save</Button>
                <Button
                  onClick={() => {
                    setOpenChangeAddress(false);
                  }}
                >
                  Trở Lại
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      <Paper elevation={7}>
        <div className={classes.listproduct}>
          <Grid container>
            <Grid item xs={6}>
              Sản phẩm
            </Grid>
            <Grid item xs={2}>
              Đơn giá
            </Grid>
            <Grid item xs={2}>
              Số lượng
            </Grid>
            <Grid item xs={2}>
              Thành Tiền
            </Grid>
          </Grid>
          <ul style={{ padding: 0 }}>
            {product.map((item, index) => {
              if (item.check) {
                return (
                  <li className={classes.listproduct_item} key={index}>
                    <Grid key={index} container alignItems="center">
                      <Grid item xs={6}>
                        <div
                          style={{
                            display: "flex",
                            fontWeight: "bold",
                            alignItems: "center",
                          }}
                        >
                          <div
                            className={classes.listproduct_item__img}
                            style={{ display: "inline-block" }}
                          >
                            <img
                              src={item.imageUrl}
                              alt=""
                              className={classes.img}
                            />
                          </div>
                          <div
                            style={{
                              display: "inline-block",
                              marginLeft: 20,
                              fontSize: 16,
                            }}
                          >
                            {item.name}
                          </div>
                        </div>
                      </Grid>

                      <Grid item xs={2}>
                        <span>{item.price}</span>{" "}
                      </Grid>
                      <Grid item xs={2}>
                        <span>{item.quantity}</span>
                      </Grid>
                      <Grid item xs={2}>
                        <span>{item.price * item.quantity}</span>
                      </Grid>
                    </Grid>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
          <Grid container className={classes.total}>
            <Grid item xs={10}>
              Tổng số tiền :
            </Grid>
            <Grid item xs={2} style={{ color: "#ee4d2d", fontSize: 20 }}>
              {total}đ
            </Grid>
          </Grid>
        </div>
      </Paper>
      <Paper elevation={7}>
        <div className={classes.method}>
          <div className={classes.method__title}>Phương Thức Thanh Toán</div>
          <Button variant="outlined" onClick={handleSetPostpaid}>
            {" "}
            Thanh toán khi nhận hàng
          </Button>
          <Button variant="outlined" onClick={handleSetPrePay}>
            Thanh toán với vnpay
          </Button>
        </div>
        <div
          className={classes.content}
          style={{ display: paymentMethod ? "none" : "block" }}
        >
          Thanh toán khi nhận hàng: Phí thu hộ 0đ. Phí vận chuyển sẽ được tính
          vào đơn hàng của bạn
        </div>
        <div
          className={classes.content}
          style={{ display: paymentMethod ? "block" : "none" }}
        >
          Đơn hàng sẽ được thanh toán online với ví điện tử VN PAY
        </div>
      </Paper>
      <Paper elevation={7}>
        <Grid container justifyContent="flex-end">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmitPayment}
          >
            Đặt Hàng
          </Button>
        </Grid>
      </Paper>
    </div>
  );
}
export default Payment;
