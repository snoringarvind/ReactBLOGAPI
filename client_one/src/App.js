import "./App.css";
import { BlogsContext } from "./Components/Context";
import { useContext } from "react";
import Login from "./Components/Login";
import List from "./Components/List";
import Home from "./Components/Home";
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
