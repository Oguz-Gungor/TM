import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Auth from "../../request/api/Auth";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "../../utils/TokenStorage";
import useForm from "../../customHooks/useForm";
const formProps = {
  name: { required: true },
  password: { required: true },
};

function Login() {
  //api logic
  const { form, isformValid, changeFormInput } = useForm(formProps);
  const handleLogin = () => {
    Auth.SignIn(form.name.value, form.password.value).then((response) => {
      if (response.status === 200) authenticate(response.data.token);
    });
  };
  useEffect(() => {
    if (getToken() !== null) navigateHome();
  }, []);

  //view logic
  const setFormField = (key) => (event) => {
    changeFormInput(key, event.target.value);
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
      <TextField
        error={form.name.validation}
        helperText={form.name.validation}
        label={"Name"}
        onChange={setFormField("name")}
      />
      <TextField
        error={form.password.validation}
        helperText={form.password.validation}
        label={"Password"}
        onChange={setFormField("password")}
      />
      <Box className="button-container">
        <Button
          onClick={handleLogin}
          disabled={!isformValid}
          variant="contained"
        >
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
