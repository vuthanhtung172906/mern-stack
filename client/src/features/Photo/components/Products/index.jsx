import React from "react";
import PropTypes from "prop-types";
import { Grid, makeStyles } from "@material-ui/core";
import CardImage from "../CardImage";
import { addToCartThunk } from "../../../Auth/userSlice";
import { useDispatch, useSelector } from "react-redux";

ProductsPage.propTypes = {
  products: PropTypes.object.isRequired,
};
const styles = makeStyles((theme) => ({
  rootABC: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiCollapse-wrapperInner": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "20px 0px",
    },
    "& .MuiCollapse-wrapperInner:hover": {
      "& .MuiButtonBase-root": {
        display: "inline-flex",
      },
      transition: "all 0.5s 0s ease",
      opacity: 0.8,
    },
  },
  containerABC: {
    width: "80%",
  },
  pagination: {
    backgroundColor: "#eee",
    borderRadius: "15px",
    margin: "20px auto",
  },
}));
function ProductsPage(props) {
  const classes = styles();
  const { products } = props;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.token.accesstoken);
  const handleClickOrder = async (product) => {
    const arg = { cart, product, token };
    await dispatch(addToCartThunk(arg));
    try {
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className={classes.rootABC}>
      <Grid
        container
        spacing={2}
        className={classes.containerABC}
        id="place-to-visit"
      >
        {products.body?.map((photo, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <CardImage
              place={photo}
              checked={true}
              key={index}
              handleClickOrder={handleClickOrder}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ProductsPage;
