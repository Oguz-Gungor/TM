import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Auth from "../../request/api/Auth";
import "./Login.scss";

function Login() {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const setFormField = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleLogin = () => {
    console.log(name, password);
    Auth.SignIn(name, password).then((response) => {
      console.log(response.data);
    });
  };
  return (
    <Box className="login-container">
      <Typography>TM</Typography>
      <TextField label={"Name"} onChange={setFormField(setName)} />
      <TextField label={"Password"} onChange={setFormField(setPassword)} />
      <Button onClick={handleLogin}>login</Button>
    </Box>
  );
}

export default Login;
