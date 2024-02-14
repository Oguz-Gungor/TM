import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../component/InfoCard/InfoCard";
import Resources from "../../request/api/Resources";
import { getToken } from "../../utils/TokenStorage";
import { updateUser } from "./store";

export default function Main() {
  //react logic

  const dispatch = useDispatch();
  const data = useSelector((state) => state.reducer.MainPageSlice.userInfo);
  useEffect(() => {
    if (getToken() === null) navigateLogin();
  }, []);
  const onEdit = ({ name, email, birthDate }) => {
    Resources.Update(email, birthDate, name).then((response) => {
      dispatch(updateUser(response.data));
    });
  };

  //component logic
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };

  return (
    <Box>
      <InfoCard {...{ ...data, onEdit }} />
    </Box>
  );
}
