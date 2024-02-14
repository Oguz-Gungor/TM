import { Box, Typography } from "@mui/material";
import "./InfoCard.scss";

export default function InfoCard({ email, dateBirthday, fullName, role }) {
  return (
    <Box className="info-card-container">
      <Typography>{email}</Typography>
      <Typography>{dateBirthday}</Typography>
      <Typography>{fullName}</Typography>
      <Typography>{role}</Typography>
    </Box>
  );
}
