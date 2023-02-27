import { BrowserRouter, Routes, Route } from "react-router-dom";
import List from "./Components/List";
import Add from "./Components/Add";
import Update from "./Components/Update";

function App() {
  return (
    <div className="main">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
