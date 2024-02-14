import { Box, ButtonBase, Modal, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./InfoCard.scss";
import useModal from "../../customHooks/useModal";
import EditModal from "../EditModal/EditModal";

export default function InfoCard({ email, dateBirthday, fullName, onEdit }) {
  const { open, handleOpen, handleClose } = useModal();
  return (
    <Box className="info-card-container">
      <ButtonBase onClick={handleOpen} className="edit-button">
        <EditIcon />
      </ButtonBase>
      <Box className="content-container">
        <Box className="info-content">
          <Typography>{email}</Typography>
          <Typography>{dateBirthday}</Typography>
          <Typography>{fullName}</Typography>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <EditModal
          userInfo={{ email, dateBirthday, fullName }}
          onSubmit={(...params) => {
            handleClose();
            onEdit(...params);
          }}
        />
      </Modal>
    </Box>
  );
}
