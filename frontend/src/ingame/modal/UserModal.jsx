import React, { useState } from "react";
import {
  Modal,
  Grid,
  Box,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { closeMenu } from "../../modules/slices/modalSlice";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingError } from "./LoadingError";
import { useNavigate } from "react-router-dom";

// modal style
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

export default function UserModal() {
  const [item, setItem] = useState("");
  const menuState = useSelector((state) => state.modal.menu);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = () => {
    dispatch(closeMenu());
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
    handleMenu();
  };

  return (
    <>
      <Modal
        open={menuState}
        onClose={handleMenu}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="close" onClick={handleMenu}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Typography
              variant="h4"
              component="h2"
              sx={{ fontWeight: "Bold", mb: 8 }}>
              TEST123님, 환영합니다!
            </Typography>
            <Stack spacing={4} sx={{ mb: 4 }}>
              <Button
                variant="contained"
                sx={{
                  background: "#4cb5f5",
                  fontWeight: "Bold",
                  mt: 4,
                }}
                onClick={() => {
                  console.log("click");
                }}>
                내 통장 확인하기
              </Button>
              <Button
                variant="contained"
                sx={{
                  background: "#4cb5f5",
                  fontWeight: "Bold",
                  mt: 4,
                }}
                onClick={logout}>
                로그아웃
              </Button>
            </Stack>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
