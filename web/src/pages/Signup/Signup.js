import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import Auth from "../../request/api/Auth";
import { getToken, setToken } from "../../utils/TokenStorage";
import "./Signup.scss";
import Validators from "../../utils/Validators";
import useForm from "../../customHooks/useForm";

const formProps = {
  name: { required: true },
  password: { required: true },
  email: {
    required: true,
    validator: (value, form) =>
      Validators.validateEmail(value) ? null : "Invalid email",
  },
  birthDate: {
    required: true,
  },
};

export default function Signup() {
  //api logic

  const { form, isformValid, changeFormInput } = useForm(formProps);
  const handleSignUp = () => {
    Auth.SignUp(
      form.email.value,
      form.birthDate.value,
      form.name.value,
      form.password.value
    ).then((response) => {
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
      <TextField
        label={"Email"}
        error={form.email.validation}
        helperText={form.email.validation}
        onChange={setFormField("email")}
      />
      <DatePicker
        onChange={(event) => changeFormInput("birthDate", event.$d)}
      />
      <Box className="button-container">
        <Button
          onClick={handleSignUp}
          variant="contained"
          disabled={!isformValid}
        >
          Signup
        </Button>
        <Button onClick={navigateSignup} variant="outlined">
          SignIn
        </Button>
      </Box>
    </Box>
  );
}
