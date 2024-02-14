import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Auth from "../../request/api/Auth";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "../../utils/TokenStorage";

function Login() {
  //api logic
  const handleLogin = () => {
    Auth.SignIn(name, password).then((response) => {
      if (response.status === 200) authenticate(response.data.token);
    });
  };
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    if (getToken() !== null) navigateHome();
  }, []);

  //view logic
  const setFormField = (setter) => (event) => {
    setter(event.target.value);
  };
  const navigate = useNavigate();

  const navigateSignup = () => {
    navigate("/signUp");
  };
  const navigateHome = () => {
    navigate("/");
  };
  const authenticate = (token) => {
    setToken(token);
    navigateHome();
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
