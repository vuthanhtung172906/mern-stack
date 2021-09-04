import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Collapse,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

CardImage.propTypes = {
  checked: PropTypes.bool,
  place: PropTypes.object.isRequired,
  handleClickOrder: PropTypes.func.isRequired,
};
const styles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: 500,
    width: 350,
    background: "rgba(0,0,0,0.5)",
    cursor: "pointer",
    [theme.breakpoints.between("md", "lg")]: {
      height: 500,
      width: 280,
    },
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "300px",
    width: "100%",
    [theme.breakpoints.between("md", "lg")]: {
      height: "300px",
      width: "100%",
    },
  },
  image__img: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  content: {
    width: "100%",
    margin: "auto 0",
    flexFlow: "row wrap",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
  },
  title: {
    color: "#eee",
    fontSize: "1.3rem",
    fontWeight: "bold",
    fontFamily: "Nutito",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  des: {
    color: "#eee",
    fontFamily: "Nutito",
    fontSize: "1rem",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    margin: "12px",
  },
  cost: {
    color: "#eee",
    fontFamily: "Nutito",
    fontSize: "1.8rem",
    fontWeight: "bold",
    margin: 0,
  },

  btn_grad: {
    backgroundImage:
      "linear-gradient(to right, #DD5E89 0%, #F7BB97  51%, #DD5E89  100%)",

    textAlign: "center",
    textTransform: "uppercase",
    transition: "0.5s",
    backgroundSize: "200% auto",
    color: "white",
    boxShadow: "0 0 20px #222",
    borderRadius: "10px",
    display: "block",
  },
}));
function CardImage(props) {
  const { place, checked, handleClickOrder } = props;
  const classes = styles();
  return (
    <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
      <Paper elevation={10} className={classes.root}>
        <div className={classes.image}>
          <img
            src={place.imageUrl}
            alt={place.name}
            className={classes.image__img}
          />
        </div>
        <Typography className={classes.title}>{place.name}</Typography>
        <Typography className={classes.des} paragraph>
          {place.description}
        </Typography>
        <div className={classes.content}>
          <Typography className={classes.cost} paragraph>
            ${place.price}
          </Typography>
          <Button
            className={classes.btn_grad}
            variant="contained"
            color="primary"
            onClick={() => handleClickOrder(place)}
          >
            Order
          </Button>
        </div>
      </Paper>
    </Collapse>
  );
}

export default CardImage;
