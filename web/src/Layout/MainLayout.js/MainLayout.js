import { AppBar, Box, Button, MenuItem, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import useReduxFetch from "../../customHooks/useReduxFetch";
import navbar from "../../data/navbar";
import { GetInfo } from "../../pages/Main/store";
import BaseService from "../../request/BaseService";
import { removeToken } from "../../utils/TokenStorage";
import "./MainLayout.scss";

export default function MainLayout() {
  //apiLogic
  const { payload: role } = useReduxFetch(
    GetInfo,
    (state) => state.reducer.MainPageSlice.userInfo?.role
  );

  //component logic
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };
  BaseService.logoutCallback = handleLogout;
  return (
    <Box className="main-layout">
      <AppBar>
        <Toolbar>
          <Box className="menu-item-container">
            {navbar
              .filter(({ predicate }) => !predicate || predicate(role))
              .map(({ label, path }) => (
                <MenuItem variant="contained" onClick={() => navigate(path)}>
                  {label}
                </MenuItem>
              ))}
          </Box>

          <Button onClick={() => handleLogout()} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box className="content">
        <Outlet />
      </Box>
    </Box>
  );
}
