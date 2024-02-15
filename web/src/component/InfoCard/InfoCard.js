import { Box, ButtonBase, Modal, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./InfoCard.scss";
import useModal from "../../customHooks/useModal";
import EditModal from "../EditModal/EditModal";

export default function InfoCard({ email, dateBirthday, fullName, onEdit }) {
  const { open, handleOpen, handleClose } = useModal();
  return (
    <Box className="info-card-container">
      <Box className="content-container">
        <Box className="info-content">
          <InfoElement label={"Name"} value={fullName} />
          <InfoElement label={"Email"} value={email} />
          <InfoElement label={"BirthDay"} value={dateBirthday} />
        </Box>
      </Box>
      <ButtonBase onClick={handleOpen} className="edit-button">
        <EditIcon />
      </ButtonBase>
      <Modal open={open} onClose={handleClose}>
        <EditModal
          userInfo={{ email, dateBirthday, fullName }}
          onSubmit={(...params) => {
            handleClose();
            onEdit(...params);
          }}
          onCancel={handleClose}
        />
      </Modal>
    </Box>
  );
}

const InfoElement = ({ label, value }) => {
  return (
    value && (
      <Typography>
        {label}: {value}
      </Typography>
    )
  );
};
