import { Box } from "@mui/material";
import { useEffect } from "react";
import InfoCard from "../../component/InfoCard/InfoCard";
import useReduxFetch from "../../customHooks/useReduxFetch";
import Resources from "../../request/api/Resources";
import { GetInfo } from "./store";

export default function Main() {
  const data = useReduxFetch(
    GetInfo,
    (state) => state.reducer.MainPageSlice.userInfo
  );
  console.log(data);
  return (
    <Box>
      <InfoCard {...data} />
    </Box>
  );
}
