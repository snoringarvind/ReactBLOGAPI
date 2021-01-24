import React, { useContext } from "react";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./List";
import Navigation from "./Navigation";
import AuthButton from "./AuthButton";
import Login from "./Login";
import { BlogsContext } from "./Context";
import Logout from "./Logout";
import Detail from "./Detail";
import Update from "./Update";
import Create from "./Create";
import Delete from "./Delete";

const Home = () => {
  const { isAuthValue } = useContext(BlogsContext);
  const [isAuth, setIsAuth] = isAuthValue;

  return (
    <div className="Home">
      <Router>
        {isAuth && <Navigation />}
        <AuthButton />
        <Switch>
          {isAuth ? (
            <>
              <Route path="/blogs">
                <List />
              </Route>
              {/* iye match hone par hi rukh ja raha hain update tak ja hi nahi raha isliye exact */}
              <Route exact path="/blog/:id">
                <Detail />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/blog/:id/update">
                <Update />
              </Route>
              <Route path="/blog/:id/delete">
                <Delete />
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
