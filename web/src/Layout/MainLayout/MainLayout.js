import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./MainLayout.scss";

export default function MainLayout() {
  return (
    <Box className="main-layout">
      <Outlet />
    </Box>
  );
}
