import { makeStyles } from "@material-ui/core";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AllUserPage from "./AllUserPage";
import ProductCtrl from "./ProductCtrl";
import SideBarAdmin from "./SideBarAdmin";
// import PropTypes from "prop-types";

AdminPage.propTypes = {};
const styles = makeStyles((theme) => ({
  root: {
    padding: "20px 0px 0px 0px",
    display: "flex",
    flexFlow: "row",
    margin: "auto 20px",
    marginTop: 75,
    justifyContent: "center",
  },
  content: {
    minWidth: "500px",
    " -webkit-box-shadow": " 0px 0px 25px 30px rgba(199,199,199,0.48)",
    "box-shadow": "0px 0px 25px 30px rgba(199,199,199,0.48)",
    marginRight: 10,
  },
}));
function AdminPage(props) {
  const classes = styles();
  const match = useRouteMatch();
  return (
    <div className={classes.root}>
      <SideBarAdmin />
      <div className={classes.content}>
        <Switch>
          <Route path={match.url} exact>
            ABC
          </Route>
          <Route path={`${match.url}/users`}>
            <AllUserPage />
          </Route>
          <Route path={`${match.url}/products`}>
            <ProductCtrl />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default AdminPage;
