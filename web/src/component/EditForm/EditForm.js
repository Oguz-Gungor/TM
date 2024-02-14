import { Box, Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import "./EditForm.scss";

export default function EditForm({ userInfo, onSubmit }) {

  //view logic
  const [name, setName] = useState(userInfo?.fullName);
  const [email, setEmail] = useState(userInfo?.email);
  const [birthDate, setBirthDate] = useState(userInfo?.dateBirthday);

  const setFormField = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <Box className="edit-container">
      <TextField value={name} label={"Name"} onChange={setFormField(setName)} />
      <TextField
        value={email}
        label={"Email"}
        onChange={setFormField(setEmail)}
      />
      <DatePicker
        value={dayjs(birthDate,)}
        onChange={(event) => setBirthDate(event.$d)}
      />
      <Box className="button-container">
        <Button
          onClick={() => onSubmit({name, email, birthDate})}
          variant="contained"
        >
          Done
        </Button>
      </Box>
    </Box>
  );
}
