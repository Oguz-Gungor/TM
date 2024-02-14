import { useState } from "react";

export default function useModal(initialState) {
  const [open, setOpen] = useState(initialState);
  const [payload, setPayload] = useState(null);
  const handleOpen = (payload) => {
    setOpen(true);
    setPayload(payload);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return { open, handleOpen, handleClose, payload };
}
