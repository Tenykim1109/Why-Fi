import React, { useState } from "react";
import { Modal, Grid, Box, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeDeposit } from "../../modules/slices/modalSlice";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingError } from "./LoadingError";
import MakeDeposit from "../../pages/bankbook/MakeDeposit";

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

export default function DepositModal() {
  const [item, setItem] = useState("");
  const depositState = useSelector((state) => state.modal.deposit);
  const dispatch = useDispatch();

  const handleDeposit = () => {
    dispatch(closeDeposit());
  };

  return (
    <>
      <Modal
        open={depositState}
        onClose={handleDeposit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="close" onClick={handleDeposit}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <MakeDeposit />
        </Box>
      </Modal>
    </>
  );
}
