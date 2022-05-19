import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { havePwd, notHavePwd } from "../../modules/slices/userSlice";
import { Modal, Box, Grid, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingError } from "./LoadingError";
import Tutorial from "../../pages/bankbook/Tutorial";
import { closeTutorial, openTutorial } from "../../modules/slices/modalSlice";

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
  const open = useSelector((state) => state.modal.tutorial);
  const havePwd = useSelector((state) => state.user.hasBookPwd);
  const dispatch = useDispatch();

  //   useEffect(() => {
  //     if (havePwd) {
  //       dispatch(closeTutorial());
  //     } else {
  //       dispatch(openTutorial());
  //     }
  //   }, [havePwd]);

  const handleClose = () => {
    dispatch(closeTutorial());
  };

  return (
    <>
      <Modal
        open={open && !havePwd}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center">
            <Tutorial />
            {/* <Button
              variant="contained"
              sx={{
                background: "#4cb5f5",
                fontWeight: "Bold",
                mt: 4,
              }}
              onClick={handleClose}>
              다음에 할래요
            </Button> */}
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
