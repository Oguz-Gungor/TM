import { Box, Button, TextField } from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import "./EditForm.scss";
import useForm from "../../customHooks/useForm";
import Validators from "../../utils/Validators";

const formProps = (userInfo) => ({
  name: { required: true, value: userInfo?.fullName },
  email: {
    required: true,
    value: userInfo?.email,
    validator: (value, form) =>
      Validators.validateEmail(value) ? null : "Invalid email",
  },
  birthDate: {
    value: userInfo?.dateBirthday,
    required: true,
  },
});
const formValidate = (userInfo) => (form) =>
  form.name.value !== userInfo?.fullName ||
  form.email.value !== userInfo?.email ||
  form.birthDate.value !== userInfo?.dateBirthday;

export default function EditForm({ userInfo, onSubmit, onCancel }) {
  //react logic
  const { form, isformValid, changeFormInput } = useForm(
    formProps(userInfo),
    formValidate(userInfo)
  );

  //view logic
  const setFormField = (key) => (event) => {
    changeFormInput(key, event.target.value);
  };

  return (
    <Box className="edit-container">
      <TextField
        error={form.name.validation}
        helperText={form.name.validation}
        value={form.name.value}
        label={"Name"}
        onChange={setFormField("name")}
      />
      <TextField
        error={form.email.validation}
        helperText={form.email.validation}
        value={form.email.value}
        label={"Email"}
        onChange={setFormField("email")}
      />
      <DatePicker
        value={dayjs(form.birthDate.value)}
        onChange={(event) => changeFormInput("birthDate", event.$d)}
      />
      <Box className="button-container">
        <Button
          onClick={() =>
            onSubmit({
              name: form.name.value,
              email: form.email.value,
              birthDate: form.birthDate.value,
            })
          }
          disabled={!isformValid}
          variant="contained"
        >
          Done
        </Button>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
