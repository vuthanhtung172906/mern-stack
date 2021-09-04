import React from "react";
import SideBar from "./SideBar";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import Address from "../Address";
import { makeStyles } from "@material-ui/core";
import ChangePassword from "./ChangePassword";
UserPage.propTypes = {};
const styles = makeStyles((theme) => ({
  root: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px 0px 50px 0px",
    display: "flex",
    marginTop: 75,
    flexFlow: "row wrap",
  },
  content: {
    flex: 7,
    " -webkit-box-shadow": " 0px 0px 25px 30px rgba(199,199,199,0.48)",
    "box-shadow": "0px 0px 25px 30px rgba(199,199,199,0.48)",
  },
}));
function UserPage(props) {
  const classes = styles();
  const match = useRouteMatch();
  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.content}>
        <Switch>
          <Route path={match.url} exact>
            ABC
          </Route>
          <Route path={`${match.url}/address`}>
            <Address />
          </Route>
          <Route path={`${match.url}/change-pass`}>
            <ChangePassword />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default UserPage;
