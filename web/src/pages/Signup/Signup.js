import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  //api logic
  const handleSignUp = () => {
    console.log(name, password, email, birthDate);
    //Auth.SignIn(name, password).then((response) => {
    //  console.log(response.data);
    //});
  };

  //view logic
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [birthDate, setBirthDate] = useState();

  const setFormField = (setter) => (event) => {
    setter(event.target.value);
  };
  const navigate = useNavigate();

  const navigateSignup = () => {
    navigate("/login");
  };
  return (
    <Box className="login-container">
      <Typography>TM</Typography>
      <TextField label={"Name"} onChange={setFormField(setName)} />
      <TextField label={"Password"} onChange={setFormField(setPassword)} />
      <TextField label={"Email"} onChange={setFormField(setEmail)} />
      <DatePicker onChange={(event) => console.log(event.$d)} />
      <Box className="button-container">
        <Button onClick={handleSignUp} variant="contained">
          Signup
        </Button>
        <Button onClick={navigateSignup} variant="outlined">
          SignIn
        </Button>
      </Box>
    </Box>
  );
}
