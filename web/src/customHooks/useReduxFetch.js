import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useReduxFetch(dispatcher, selector, ...flags) {
  const dispatch = useDispatch();
  const payload = useSelector(selector);
  useEffect(() => {
    dispatch(dispatcher());
  }, [...flags]);
  return payload;
}
