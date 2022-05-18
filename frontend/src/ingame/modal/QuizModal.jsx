import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeQuiz } from "../../modules/slices/modalSlice";
import { Modal, Box, Grid, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingError } from "./LoadingError";
import Start from "../../pages/quiz/Start";

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

const QuizItem = () => {
  let ui = <Start />;

  return ui;
};

export default function QuizModal() {
  const quizState = useSelector((state) => state.modal.quiz);
  const dispatch = useDispatch();

  const handleQuiz = () => {
    dispatch(closeQuiz());
  };

  return (
    <>
      <Modal
        open={quizState}
        onClose={handleQuiz}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="close" onClick={handleQuiz}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <QuizItem />
        </Box>
      </Modal>
    </>
  );
}
