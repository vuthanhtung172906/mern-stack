import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserApi from "../../../../../api/userApi";
import { Chip, Grid, makeStyles, Paper } from "@material-ui/core";
import { setSnackbar } from "../../../../../app/snackbarSlice";
OrderHistory.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "1000px",
    margin: "100px auto",
  },
  payment: {
    padding: 20,
    margin: 15,
  },
  title: {
    padding: 10,
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  title__code: {
    display: "inline-block",
    fontWeight: 700,
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
  },
  title__status: {
    display: "inline-block",
    flex: 1,
    direction: "rtl",
  },
  products: {},
  product: {
    display: "flex",
    flexFlow: "row wrap",
    margin: 10,
  },
  product__img: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  paymentAddress: {
    padding: 10,
    fontSize: 16,
  },
  total: {
    padding: 10,
    display: "flex",
  },
  total__price: {
    flex: 1,
    direction: "rtl",
    fontSize: 20,
    color: "#ee4d2d",
  },
}));
function OrderHistory(props) {
  const classes = useStyles();
  const token = useSelector((state) => state.token.accesstoken);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [orderlist, setOrderList] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const getOrderList = async () => {
        if (isAdmin) {
          const list = await UserApi.getAllOrder(token);
          setOrderList(list);
        } else {
          const list = await UserApi.getOrderHistory(token);
          setOrderList(list);
        }
      };
      getOrderList();
    } catch (error) {
      throw error;
    }
  }, [token, isAdmin]);
  const handleChangeStatus = async (item) => {
    try {
      if (isAdmin) {
        const paymentID = item._id;
        const status = "00";
        await UserApi.editStatus(paymentID, status, token);
        const list = await UserApi.getAllOrder(token);
        setOrderList(list);
      } else {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: "error",
            snackbarMessage: "Đơn hàng của bạn đang được chúng tôi xác nhận",
          })
        );
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className={classes.root}>
      {orderlist.map((item, index) => (
        <Paper key={index} className={classes.payment}>
          <div className={classes.title}>
            <span>Mã đơn hàng: </span>
            <div className={classes.title__code}>{item._id}</div>
            <div className={classes.title__status}>
              <Chip
                size="small"
                color="secondary"
                label={item.status ? "Đã xác nhận" : "Đang xử lý"}
                onClick={() => handleChangeStatus(item)}
              />
            </div>
          </div>
          <Grid container className={classes.paymentProductAddress}>
            <Grid item xs={12} sm={4} className={classes.paymentProducts}>
              {item.cart.map((item2, index) => (
                <div className={classes.product} key={index}>
                  <div className={classes.product__img}>
                    <img src={item2.imageUrl} alt="" className={classes.img} />
                  </div>
                  <div className={classes.description}>
                    <div className={classes.description__name}>
                      {item2.name}
                    </div>
                    <div className={classes.description__quantity}>
                      x{item2.quantity}
                    </div>
                  </div>
                </div>
              ))}
            </Grid>
            <Grid item xs={12} sm={8} className={classes.paymentAddress}>
              Địa chỉ nhận hàng: <br />
              <span>
                {item.address.fullname} ({item.address.number})
              </span>
              <br />
              <span>
                {item.address.address} {item.address.addressMain}
              </span>
            </Grid>
          </Grid>
          <div className={classes.total}>
            <span>Tổng số tiền: </span>
            <span className={classes.total__price}>{item.total}đ</span>
          </div>
        </Paper>
      ))}
    </div>
  );
}

export default OrderHistory;
