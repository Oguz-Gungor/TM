import "./App.css";
import { useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import PageLayout from "./Layout/MainLayout/PageLayout";
import Signup from "./pages/Signup/Signup";
import MainLayout from "./Layout/MainLayout.js/MainLayout";
import Alive from "./request/api/Alive";
import Unavailable from "./pages/Unavailable/Unavailable";
import Users from "./pages/Users/Users";

function App() {
  const [alive, setAlive] = useState(false);
  useEffect(() => {
    Alive().then(({ status }) => {
      if (status == 200) setAlive(true);
    });
  }, []);
  return !alive ? (
    <Unavailable />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/" element={<MainLayout />}>
            <Route path="/users" element={<Users />} />
            <Route path="/" element={<Main />} />
            <Route path="/*" element={<Main />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
