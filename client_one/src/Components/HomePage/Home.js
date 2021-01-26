import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import List from "./List";
import Navigation from "../Navigation/Navigation";
import AuthButton from "../AuthButton";
import Login from "../LoginPage/Login";
import { BlogsContext } from "../Context";
import Logout from "../Logout";
import Detail from "../DetailPage/Detail";
import Update from "../UpdatePage/Update";
import Create from "../CreatePage/Create";
import Delete from "../DeletePage/Delete";
import "./Home.css";

const Home = () => {
  const { isAuthValue } = useContext(BlogsContext);
  const [isAuth] = isAuthValue;

  return (
    <div className="Home">
      console.log('hiiiiiiiiiiiiiiiiii');
      <Router>
        <div className="Navigation">
          {/* call saare honge ismein */}
          {isAuth && <Navigation to="/blogs" label="Blogs" />}
          {isAuth && <Navigation to="/create" label="Create" />}
          {isAuth && <Navigation to="/logout" label="Logout" />}
        </div>
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
