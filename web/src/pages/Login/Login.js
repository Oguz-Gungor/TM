import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Auth from "../../request/api/Auth";
import "./Login.scss";
import { useNavigate } from "react-router-dom";

function Login() {

  //api logic
  const handleLogin = () => {
    console.log(name, password);
    Auth.SignIn(name, password).then((response) => {
      console.log(response.data);
    });
  };

  //view logic
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const setFormField = (setter) => (event) => {
    setter(event.target.value);
  };
  const navigate = useNavigate();

  const navigateSignup = () => {
    navigate("/signUp");
  };
  return (
    <Box className="login-container">
      <Typography>TM</Typography>
      <TextField label={"Name"} onChange={setFormField(setName)} />
      <TextField label={"Password"} onChange={setFormField(setPassword)} />
      <Box className="button-container">
        <Button onClick={handleLogin} variant="contained">
          SignIn
        </Button>
        <Button onClick={navigateSignup} variant="outlined">
          Singup
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
