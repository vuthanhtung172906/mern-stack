import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, Grid, makeStyles, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { addCart2 } from "../../../userSlice";
import UserApi from "../../../../../api/userApi";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "900px",
    margin: "80px auto",
    display: "flex",
    flexFlow: "column wrap",
  },
  cart: {
    display: "flex",
    flexFlow: "column wrap",
  },
  cart__item: {
    width: "100%",
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    border: "1px solid rgb(232,232,232)",
    margin: "10px",
    padding: "10px",
  },
  cart__item__img: {
    width: 80,
    height: 80,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  input: {
    outline: "none",
    width: 50,
    height: 32,
    borderLeft: 0,
    borderRight: 0,
    fontSize: 16,
    fontWeight: 400,
    boxSizing: "border-box",
    textAlign: "center",
    cursor: "text",
    border: "1px solid rgba(0,0,0,.09)",
  },
  cart__item__quantity: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  total: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    border: "1px solid rgb(232,232,232)",
    margin: "40px 20px 40px 40px",
    padding: "10px",
    position: "sticky",
    bottom: 0,
  },
  textPayment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    lineHeight: "28px",
    fontWeight: "400px",
    color: "#EB4D2D",
  },
}));
function Cart(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.accesstoken);
  const cart = useSelector((state) => state.auth.user.cart);
  const [total, setTotal] = useState(0);
  const [cartCheck, setCartCheck] = useState([]);
  useEffect(() => {
    const newCart = cart.map((state) => {
      return {
        ...state,
        check: true,
      };
    });
    setCartCheck(newCart);
  }, [cart]);
  useEffect(() => {
    const getTotal = () => {
      const total = cartCheck.reduce((pre, item) => {
        if (item.check) {
          return pre + item.price * item.quantity;
        } else {
          return pre + 0;
        }
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cartCheck]);
  const handleClickDelete = async (value) => {
    try {
      const newCart = [...cart];
      newCart.forEach((item, index) => {
        if (item._id === value._id) {
          newCart.splice(index, 1);
        }
      });

      dispatch(addCart2(newCart));
      await UserApi.addCart(newCart, token);
      console.log({ newCart });
    } catch (error) {
      throw error;
    }
  };
  const handleClickCheck = (event, index) => {
    const newCart = [...cartCheck];
    const newArr = newCart.map((item) => {
      if (item._id === index) {
        return {
          ...item,
          check: event.target.checked,
        };
      }
      return item;
    });
    setCartCheck(newArr);
  };
  const decrement = async (id) => {
    const newCart = [...cart];
    const newArr = newCart.map((item, index) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: item.quantity === 1 ? item.quantity : item.quantity - 1,
        };
      }
      return item;
    });
    dispatch(addCart2(newArr));
    await UserApi.addCart(newArr, token);
  };
  const increment = async (id) => {
    let newCart = [...cart];
    const newArr = newCart.map((item, index) => {
      if (item._id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    dispatch(addCart2(newArr));
    await UserApi.addCart(newArr, token);
  };
  const handlePayment = () => {
    const newCart = [];
    cartCheck.forEach((state, index) => {
      if (state.check) {
        newCart.push(state);
      }
    });
    return <Link to="/">Tung</Link>;
  };
  return (
    <Paper elevation={7} className={classes.root}>
      <ul className={classes.cart}>
        {cartCheck.map((state, index) => (
          <Grid container style={{ width: "100%" }} spacing={3} key={index}>
            <li className={classes.cart__item}>
              <Grid item>
                <Checkbox
                  onChange={(event) => handleClickCheck(event, state._id)}
                  checked={state.check}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </Grid>
              <Grid item>
                <div className={classes.cart__item__img}>
                  <img
                    src={state.imageUrl}
                    alt={state.name}
                    className={classes.img}
                  />
                </div>{" "}
              </Grid>

              <Grid item xs={4} className={classes.cart__item__quantity}>
                <span>{state.name}</span>{" "}
              </Grid>

              <Grid item xs={1} className={classes.cart__item__quantity}>
                <span>{state.price}</span>{" "}
              </Grid>

              <Grid item xs={2} className={classes.cart__item__quantity}>
                <div className={classes.cart__item__quantity}>
                  <RemoveIcon
                    fontSize="small"
                    onClick={() => decrement(state._id)}
                  />
                  <span>{state.quantity}</span>
                  <AddIcon
                    fontSize="small"
                    onClick={() => increment(state._id)}
                  />
                </div>{" "}
              </Grid>

              <Grid item xs={1} className={classes.cart__item__quantity}>
                <span>{state.price * state.quantity}</span>{" "}
              </Grid>

              <Grid item className={classes.cart__item__quantity}>
                <Button onClick={() => handleClickDelete(state)}>Delete</Button>{" "}
              </Grid>
            </li>
          </Grid>
        ))}
      </ul>
      <Paper elevation={9} className={classes.total}>
        <span className={classes.textPayment} style={{ color: "#111" }}>
          TOTAL: <span className={classes.textPayment}>{total} đ</span>
        </span>
        <Button variant="contained" color="secondary" onClick={handlePayment}>
          <Link
            to={{
              pathname: "/user/checkout",
              state: {
                product: cartCheck,
                total: total,
              },
            }}
          >
            Payment
          </Link>
        </Button>
      </Paper>
    </Paper>
  );
}

export default Cart;
