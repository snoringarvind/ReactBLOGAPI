import "./App.css";
import { BlogsContext } from "./Components/Context";
import { useContext } from "react";
import Login from "./Components/LoginPage/Login";
import List from "./Components/HomePage/List";
import Home from "./Components/HomePage/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const { isAuthValue } = useContext(BlogsContext);
  const [isAuth] = isAuthValue;
  console.log(isAuth);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
