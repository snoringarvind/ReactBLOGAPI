import axios from "axios";
import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthButton from "../AuthButton";
import { BlogsContext } from "../Context";
import Navigation from "../Navigation/Navigation";
import List from "./List";
import Logout from "../Logout";
import Detail from "../Detail/Detail";
import Login from "../Login/Login";

const Home = () => {
  const { isAuthValue } = useContext(BlogsContext);
  const [isAuth] = isAuthValue;

  return (
    <div className="Home">
      <Router>
        <div className="Navigation">
          {isAuth && <Navigation to="/blogs" label="Blogs" />}
          {isAuth && <Navigation to="/logout" label="Logout" />}
        </div>
        <AuthButton />

        <Switch>
          {isAuth ? (
            <>
              <Route path="/blogs">
                <List />
              </Route>
              <Route exact path="/blog/:id">
                <Detail />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
            </>
          ) : (
            <Route path="/login">
              <Login />
            </Route>
          )}
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
