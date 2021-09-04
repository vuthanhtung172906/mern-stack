import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Button, makeStyles } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
const style = makeStyles((theme) => ({
  sidebar: {
    flex: 1,
    "& .avatar": {
      width: theme.spacing(7),
      height: theme.spacing(7),
      marginRight: 10,
    },
    "& .sidebar__username": {
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "17px",
      display: "flex",
      flexFlow: "column wrap",
      alignItems: "center",
    },
    "& .sidebar__username__profile": {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: "17px",
      color: "#888888",
    },
  },
  sidebar__avatar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexFlow: "column wrap",
  },
  sidebar__list: {
    listStyle: "none",
    padding: 0,
  },
  sidebar__list__item: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 15,
  },
  sidebar__list__item__link: {
    textDecoration: "none",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "#111111",
  },
}));
SideBar.propTypes = {};

function SideBar(props) {
  const classes = style();
  const { user } = useSelector((state) => state.auth);
  const addressClick = () => {};
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebar__avatar}>
        <Avatar alt="Avatar" src={user.avatar} className="avatar" />
        <div className="sidebar__username">
          {user.name}
          <Button className="sidebar__username__profile">
            {" "}
            <EditIcon fontSize="small" />
            Sửa hồ sơ
          </Button>
        </div>
      </div>
      <ul className={classes.sidebar__list}>
        <li className={classes.sidebar__list__item}>
          <Link
            className={classes.sidebar__list__item__link}
            to="/profile/address"
          >
            <AccountCircleIcon />
            Hồ Sơ
          </Link>
        </li>
        <li className={classes.sidebar__list__item} onClick={addressClick}>
          <Link
            className={classes.sidebar__list__item__link}
            to="/profile/address"
          >
            {" "}
            <HomeIcon /> Địa chỉ
          </Link>
        </li>
        <li className={classes.sidebar__list__item}>
          <Link
            className={classes.sidebar__list__item__link}
            to="/profile/change-pass"
          >
            <VpnKeyIcon />
            Đổi mật khẩu
          </Link>
        </li>
      </ul>
      <ul className={classes.sidebar__list}>
        <li className={classes.sidebar__list__item}>
          <AccountCircleIcon />
          Hồ Sơ
        </li>
        <li className={classes.sidebar__list__item}>
          <HomeIcon /> Địa chỉ
        </li>
        <li className={classes.sidebar__list__item}>
          <VpnKeyIcon />
          Đổi mật khẩu
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
