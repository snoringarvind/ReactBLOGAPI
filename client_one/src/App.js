import "./App.css";
import { BlogsProvider } from "./Components/Context";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div className="App">
      <BlogsProvider>
        <Home />
      </BlogsProvider>
    </div>
  );
}

export default App;
