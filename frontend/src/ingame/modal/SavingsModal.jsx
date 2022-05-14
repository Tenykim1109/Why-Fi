import React, { useState } from "react";
import { Modal, Grid, Box, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeSavings } from "../../modules/slices/modalSlice";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingError } from "./LoadingError";
import MakeSavings from "../../pages/bankbook/MakeSavings";

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

export default function SavingsModal() {
  const [item, setItem] = useState("");
  const savingsState = useSelector((state) => state.modal.savings);
  const dispatch = useDispatch();

  const handleSavings = () => {
    dispatch(closeSavings());
  };

  return (
    <>
      <Modal
        open={savingsState}
        onClose={handleSavings}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="close" onClick={handleSavings}>
              <CloseIcon />
            </IconButton>
          </Grid>
          {/* <LoadingError /> */}
          <MakeSavings />
        </Box>
      </Modal>
    </>
  );
}
