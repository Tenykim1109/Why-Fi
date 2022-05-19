import React, { useState } from "react";
import { Modal, Grid, Box, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeRemittance, closeStock } from "../../modules/slices/modalSlice";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingError } from "./LoadingError";
import Stock from "../../pages/stock/Stock";

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

export default function StockModal() {
  const [item, setItem] = useState("");
  const stockState = useSelector((state) => state.modal.stock);
  const dispatch = useDispatch();

  const handleStock = () => {
    dispatch(closeStock());
  };

  return (
    <>
      <Modal
        open={stockState}
        onClose={handleStock}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="close" onClick={handleStock}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Stock />
        </Box>
      </Modal>
    </>
  );
}
