import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import "./PageLayout.scss";

export default function PageLayout() {
  return (
    <Box className="page-layout">
      <Outlet />
    </Box>
  );
}
