import {
  AppBar,
  IconButton,
  InputBase,
  makeStyles,
  alpha,
  Toolbar,
  Avatar,
  Popper,
  MenuList,
  ClickAwayListener,
  Paper,
  MenuItem,
  Grow,
  Badge,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { searchFilter } from "../../features/Photo/filterSlice";
import { useRef, useState } from "react";
import UserApi from "../../api/userApi";
import ListAltIcon from "@material-ui/icons/ListAlt";
Header.propTypes = {};
const styles = makeStyles((theme) => ({
  appBar: {
    height: "65px",
    background: "#d44036",
    boxShadow: "none",
    alignItems: "center",
  },
  toolBar: {
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuIcon: {
    color: "#eee",
    fontSize: "2.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  h1: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },
  },
  menu: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "50%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.45),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.55),
    },
    marginTop: "30px",
    width: "70%",
    height: "50px",
    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
    display: "flex",
  },
  searchAppBar: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.45),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.55),
    },
    width: "90%",
    height: "40px",
    [theme.breakpoints.up("sm")]: {
      width: "90%",
    },
    display: "none",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "#111",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    color: "currentcolor",
    fontSize: 17,
    fontWeight: "bold",
    cursor: "pointer",
  },
  cartIcon: {
    margin: "auto 20px",
  },
}));
function Header(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = styles();
  const { user, isLogged } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.auth.user);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleToglle = () => {
    setOpen(!open);
  };
  const handleClose = (event) => {
    console.log(anchorRef.current);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  const handleLogout = async () => {
    try {
      await UserApi.logout();
      localStorage.removeItem("login");
      localStorage.removeItem("persist:root");

      window.location.href = "/";
    } catch (error) {
      window.location.href = "/";
    }
  };
  const handleProfile = () => {
    history.push("/profile");
    setOpen(false);
  };
  const handleOrderHistory = () => {
    history.push("/user/order");
    setOpen(false);
  };
  const userLink = () => {
    return (
      <>
        <div
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          to="#"
          className={classes.avatar}
        >
          {isAdmin ? (
            <Link to="/user/order" className={classes.avatar}>
              <ListAltIcon />
            </Link>
          ) : (
            <Badge
              className={classes.cartIcon}
              badgeContent={Object.values(user).length === 0 ? 0 : cart.length}
              color="secondary"
            >
              <Link to="/user/cart" className={classes.avatar}>
                <ShoppingCartIcon />
              </Link>
            </Badge>
          )}

          <div onClick={handleToglle} className={classes.avatar}>
            <Avatar alt="Avatar" src={user.avatar} />
            <span>{user.name}</span>
          </div>
        </div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleOrderHistory}>Đơn mua</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    );
  };
  const searchSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const value = e.target.value.value;
    const newFilter = {
      _limit: 12,
      _page: 1,
      _q: value,
    };
    console.log({ filter: newFilter });
    const action = searchFilter(newFilter);
    dispatch(action);
    history.push("/");
  };
  const reloadHomePage = () => {
    const restateFilter = {
      _limit: 12,
      _page: 1,
      _q: "",
    };
    dispatch(searchFilter(restateFilter));
    history.push("/");
  };
  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar className={classes.toolBar}>
        <div className={classes.menu}>
          <h1
            className={classes.h1}
            style={{ cursor: "pointer" }}
            onClick={reloadHomePage}
          >
            your
            <span style={{ color: "#3FFF4A" }}>Phone.</span>{" "}
          </h1>
          <form
            style={{ display: "flex" }}
            className={classes.searchAppBar}
            onSubmit={searchSubmit}
          >
            <div className={classes.searchIcon}>
              <SearchIcon fontSize="small" />
            </div>
            <InputBase
              autoComplete="off"
              name="value"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </form>
        </div>
        <div className={classes.signIn}>
          {isLogged ? (
            userLink()
          ) : (
            <h1 className={classes.h1}>
              <Link
                to="/user"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Sign In
              </Link>
            </h1>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
