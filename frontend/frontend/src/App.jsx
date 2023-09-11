import Create from "../pages/Create";
import Edit from "../pages/Edit";
import Home from "../pages/Home";
import Show from "../pages/Show";
import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="book/create" element={<Create />} />
        <Route path="book/:id" element={<Show />} />
        <Route path="book/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
