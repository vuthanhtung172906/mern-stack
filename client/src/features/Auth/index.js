import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router";
import LogIn from "./components/LogIn";
import FotGotPass from "./components/FotGotPass";
import SignUp from "./components/SignUp";
import Activation from "./components/Activation";
import ChangePassword from "./components/ChangePassword";
import Cart from "./components/ProfilePage/UserPage/Cart";
import Payment from "./components/ProfilePage/UserPage/Payment";
import PaymentResult from "./components/ProfilePage/UserPage/PaymentResult";
import OrderHistory from "./components/ProfilePage/UserPage/OrderHistory";

function Auth(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Redirect exact from="/user" to="/user/sign-in" />
        <Route path={`${match.url}/sign-in`} component={LogIn} />
        <Route path={`${match.url}/forgot-pass`} component={FotGotPass} />
        <Route path={`${match.url}/sign-up`} component={SignUp} />
        <Route
          path={`${match.url}/activate/:activation_token`}
          component={Activation}
        />
        <Route path={`${match.url}/reset/:token`} component={ChangePassword} />
        <Route path={`${match.url}/cart`} component={Cart} />
        <Route path={`${match.url}/checkout`} component={Payment} />
        <Route path={`${match.url}/payment_result`} component={PaymentResult} />
        <Route path={`${match.url}/order`} component={OrderHistory} />
      </Switch>
    </div>
  );
}

export default Auth;
