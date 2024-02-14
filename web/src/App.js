import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import Login from "./pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import MainLayout from "./Layout/MainLayout/MainLayout";
var axios = require("axios");

function App() {
  useEffect(() => {
    var config = {
      method: "get",
      url: "http://localhost:8084/alive",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/*" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
