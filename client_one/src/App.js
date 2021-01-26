import "./App.css";
import { BlogsContext } from "./Components/Context";
import { useContext } from "react";
import Home from "./Components/HomePage/Home";

const App = () => {
  const { isAuthValue } = useContext(BlogsContext);
  const [isAuth] = isAuthValue;
  console.log(isAuth);

  console.log("hiii");
  return (
    <div className="App">
      sddddddddddddddddddddddddddddddd
      <Home />
    </div>
  );
};

export default App;
