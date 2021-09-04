import { makeStyles } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React, { useState } from "react";
import { bannerImg } from "./BannerImg";
Banner.propTypes = {};
const styles = makeStyles((theme) => ({
  root: {
    height: "403px",
    width: "80%",
    margin: "0px auto",
    marginTop: 75,
    position: "relative",
    padding: 8,
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "opacity 400ms ease",
  },
  slide: {
    width: "100%",
    height: "100%",
    transitionDuration: "1s",
    display: "none",
    transition: "opacity 400ms ease",
  },
  slide__active: {
    width: "100%",
    height: "100%",
    transitionDuration: "1s",
    display: "block",
    transition: "opacity 400ms ease",
  },
  preArrow: {
    position: "absolute",
    top: "50%",
    color: "#eee",
    cursor: "pointer",
  },
  nextArrow: {
    position: "absolute",
    top: "50%",
    color: "#eee",
    right: 0,
    cursor: "pointer",
  },
  nav: {
    width: "100%",

    position: "absolute",
    bottom: 20,
    left: 0,
    display: "flex",
    justifyContent: "center",
  },
  nav__dot: {
    width: 20,
    height: 20,
    background: "black",
    border: "1px solid crimson",
    borderRadius: "50%",
    color: "white",
    textAlign: "center",
    cursor: "pointer",
  },
}));
function Banner(props) {
  const classes = styles();
  const [current, setCurrent] = useState(0);
  const handleClickNext = () => {
    setCurrent(current === bannerImg.length - 1 ? 0 : current + 1);
  };
  const handleClickPre = () => {
    setCurrent(current === 0 ? bannerImg.length - 1 : current - 1);
  };
  const handleClickDot = (state) => {
    setCurrent(state);
  };
  return (
    <div className={classes.root}>
      {bannerImg.map((state, index) => (
        <div
          key={index}
          className={current === index ? classes.slide__active : classes.slide}
        >
          <img src={state.banner} alt="banner1" className={classes.img} />
        </div>
      ))}
      <ArrowBackIosIcon className={classes.preArrow} onClick={handleClickPre} />
      <ArrowForwardIosIcon
        className={classes.nextArrow}
        onClick={handleClickNext}
      />
      <div className={classes.nav}>
        <span className={classes.nav__dot} onClick={() => handleClickDot(0)}>
          1
        </span>{" "}
        <span className={classes.nav__dot} onClick={() => handleClickDot(1)}>
          2
        </span>
        <span className={classes.nav__dot} onClick={() => handleClickDot(2)}>
          3
        </span>
        <span className={classes.nav__dot} onClick={() => handleClickDot(3)}>
          4
        </span>{" "}
        <span className={classes.nav__dot} onClick={() => handleClickDot(4)}>
          5
        </span>
      </div>
    </div>
  );
}

export default Banner;
