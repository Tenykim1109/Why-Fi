import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { open, close } from "../modules/slices/modalSlice";
import { store } from "../modules/store";
import { useParams } from "react-router-dom";
import {
  Modal,
  Typography,
  Box,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import MakeSavings from "../pages/bankbook/MakeSavings";
import MakeDeposit from "../pages/bankbook/MakeDeposit";
import CloseIcon from "@mui/icons-material/Close";
import { RootState } from "../modules/store";
import PhaserGame from "./PhaserGame";
import { TEXTURE_BOY, TEXTURE_GIRL } from "./constants";
import { LoadingText, ToolTip } from "./constants/loadingText";

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

// 로딩 화면
const Loading = () => {
  const load_idx = Math.floor(Math.random() * LoadingText.length); // 배열에서 랜덤하게 값 출력
  const tooltip_idx = Math.floor(Math.random() * ToolTip.length);

  return (
    <div
      className="loading"
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <div
        className="loading-item"
        style={{
          textAlign: "center",
        }}>
        <h2>{LoadingText[load_idx]}</h2>
        <h3>{`TIP: ${ToolTip[tooltip_idx]}`}</h3>
      </div>
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
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <MakeSavings />
        </Box>
      </Modal>
    </>
  );
}
