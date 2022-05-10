import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { open, close } from "../modules/slices/modalSlice";
import { store } from "../modules/store";
import { useParams } from "react-router-dom";
import { Modal, Typography, Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "../modules/store";
import PhaserGame from "./PhaserGame";
import { TEXTURE_BOY, TEXTURE_GIRL } from "./constants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// 로딩 화면
const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: "100vh",
      }}>
      {/* <img src="assets/mascot/dolphin_default_blue.png" alt="My Image" /> */}
      <h2>로딩중...</h2>
    </div>
  );
};

export default function GameApp() {
  const [loading, setLoading] = useState(true);
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();

  // 로딩화면 띄우는 용도
  useEffect(() => {
    setLoading(true);

    //게임 연결
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const handleClose = () => {
    dispatch(close());
  };

  return (
    <>
      {/* <Button
        onClick={() => {
          dispatch(open());
          console.log(isOpen);
        }}>
        클릭
      </Button> */}
      {loading ? <Loading /> : <PhaserGame />}
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
