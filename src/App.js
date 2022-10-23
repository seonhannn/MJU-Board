import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import BoardList from "./pages/BoardList";
import "../src/css/App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/BoardList:id" element={<BoardList></BoardList>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
