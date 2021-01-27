import axios from "axios";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthButton from "../AuthButton";
import { BlogsContext } from "../Context";
import Navigation from "../Navigation/Navigation";
import List from "./List";
import Logout from "../Logout";
import Detail from "../Detail/Detail";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const Home = () => {
  const { isAuthValue } = useContext(BlogsContext);
  const [isAuth] = isAuthValue;

  return (
    <div className="Home">
      <Router>
        <div className="Navigation">
          <Navigation to="/blogs" label="Blogs" />
          {isAuth && <Navigation to="/logout" label="Logout" />}
          {!isAuth && <Navigation to="/login" label="Login" />}
        </div>

        <AuthButton />
        <Switch>
          <Route exact path="/">
            <Redirect to="/blogs" />
          </Route>
          <Route path="/blogs">
            <List />
          </Route>
          <Route exact path="/blog/:id">
            <Detail />
          </Route>
          {isAuth && (
            <Route path="/logout">
              <Logout />
            </Route>
          )}

          {!isAuth && (
            <>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
