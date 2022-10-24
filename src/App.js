import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import BoardList from "./pages/BoardList";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Write from "./pages/Write";
import "../src/css/App.css";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.Auth.token);
  console.log(token);

  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Main></Main>}></Route>
          <Route path="/BoardList:id" element={<BoardList></BoardList>}></Route>
          <Route path="/LogIn" element={<LogIn></LogIn>}></Route>
          <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
          <Route path="/Wirte" element={<Write></Write>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
