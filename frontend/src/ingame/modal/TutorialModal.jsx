import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { havePwd, notHavePwd } from "../../modules/slices/userSlice";
import { Modal, Box, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingError } from "./LoadingError";
import Tutorial from "../../pages/bankbook/Tutorial";

// modal style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TutorialModal() {
  const [item, setItem] = useState("");
  const [open, setOpen] = useState(false);
  const havePwd = useSelector((state) => state.user.havePwd);
  const dispatch = useDispatch();

  useEffect(() => {
    if (havePwd) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Tutorial />
        </Box>
      </Modal>
    </>
  );
}
