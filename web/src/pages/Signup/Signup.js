import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import Auth from "../../request/api/Auth";
import { getToken, setToken } from "../../utils/TokenStorage";
import "./Signup.scss";

export default function Signup() {
  //api logic
  const handleSignUp = () => {
    console.log(name, password, email, birthDate);
    Auth.SignUp(email, birthDate, name, password).then((response) => {
      if (response.status === 200) authenticate(response.data.token);
    });
  };
  useEffect(() => {
    if (getToken() !== null) navigateHome();
  }, []);


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
  const navigateHome = () => {
    navigate("/");
  };
  const authenticate = (token) => {
    setToken(token);
    navigateHome();
  };
  return (
    <Box className="signup-container">
      <Typography>TM</Typography>
      <TextField label={"Name"} onChange={setFormField(setName)} />
      <TextField label={"Password"} onChange={setFormField(setPassword)} />
      <TextField label={"Email"} onChange={setFormField(setEmail)} />
      <DatePicker onChange={(event) => setBirthDate(event.$d)} />
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
