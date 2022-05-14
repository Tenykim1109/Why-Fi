import React, { useState } from "react";
import { Modal, Grid, Box, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeRemittance } from "../../modules/slices/modalSlice";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingError } from "./LoadingError";

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

export default function RemittanceModal() {
  const [item, setItem] = useState("");
  const remittanceState = useSelector((state) => state.modal.remittance);
  const dispatch = useDispatch();

  const handleRemittance = () => {
    dispatch(closeRemittance());
  };

  return (
    <>
      <Modal
        open={remittanceState}
        onClose={handleRemittance}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="close" onClick={handleRemittance}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <LoadingError />
        </Box>
      </Modal>
    </>
  );
}
