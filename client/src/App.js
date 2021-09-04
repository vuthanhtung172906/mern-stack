// import { lazy, Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import NotFound from "./components/NotFound";
import { CssBaseline } from "@material-ui/core";
import Photo from "./features/Photo";
import Auth from "./features/Auth";
import Header from "./components/Header";
import SnackBar from "./components/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAccessTokenThunk } from "./app/tokenSlice";
import { getInforUserThunk } from "./features/Auth/userSlice";
import ProfilePage from "./features/Auth/components/ProfilePage";

function App() {
  // const Photo = lazy(() => import("./features/Photo"));
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token.accesstoken);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.isLogged) {
      const getToken = async () => {
        try {
          await dispatch(getAccessTokenThunk());
          await dispatch(getInforUserThunk(token));
        } catch (error) {
          throw error;
        }
      };
      getToken();
    } // eslint-disable-next-line
  }, [auth.isLogged, token]);
  // useEffect(() => {
  //   if (token) {
  //     const getUser = async () => {
  //       try {
  //         await dispatch(getInforUserThunk(token));
  //       } catch (error) {
  //         throw error;
  //       }
  //     };
  //     getUser();
  //   } // eslint-disable-next-line
  // }, [token]);
  return (
    <div>
      {/* <Suspense fallback={<div>Loading...............</div>}> */}
      <BrowserRouter>
        <Header />
        <SnackBar />
        <div>
          <Switch>
            <Redirect exact from="/" to="/photo" />
            <Route path="/photo" component={Photo} />
            <Route path="/user" component={Auth} />
            <Route path="/profile" component={ProfilePage} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
      <CssBaseline />
      {/* </Suspense> */}
    </div>
  );
}

export default App;
