import "./App.css";
import Home from "./Components/Home/Home";
import { BlogsProvider } from "./Components/Context";

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
