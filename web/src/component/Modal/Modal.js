import { Box } from "@mui/material";
import "./Modal.scss"

export default function Modal({ children }) {
  return (
    <Box className="modal-wrapper">
      <Box className="modal-container">{children}</Box>
    </Box>
  );
}
