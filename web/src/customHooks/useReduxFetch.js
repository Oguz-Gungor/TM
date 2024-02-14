import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useReduxFetch(dispatcher, selector, ...flags) {
  const dispatch = useDispatch();
  const payload = useSelector(selector);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    dispatch(dispatcher());
  }, [...flags, flag]);

  const fetch = () => {
    setFlag((prevState) => !prevState);
  };
  return { payload, fetch };
}
