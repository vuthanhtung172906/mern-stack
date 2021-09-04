import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import MainPage from "./components/MainPage";
import AddEdit from "./components/AddEditPage";
Photo.propTypes = {};

function Photo(props) {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={match.url} exact component={MainPage} />
      <Route path={`${match.url}/add`} component={AddEdit} />
    </Switch>
  );
}

export default Photo;
