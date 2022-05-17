import React from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Stack,
  IconButton,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import HelpDeposit from "../../pages/bankbook/HelpDeposit";
import HelpSavings from "../../pages/bankbook/HelpSavings";
import HelpBankbook from "../../pages/bankbook/HelpBackbook";
import { LoadingError } from "./LoadingError";
import { useDispatch, useSelector } from "react-redux";
import { closeQnA } from "../../modules/slices/modalSlice";

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

const QnAItem = ({ keyword }) => {
  let ui;
  switch (keyword) {
    case "예금":
      ui = <HelpDeposit />;
      break;
    case "적금":
      ui = <HelpSavings />;
      break;
    case "송금":
      ui = <HelpBankbook />;
      break;
    default:
      ui = <LoadingError />;
  }

  return ui;
};

export default function QnAModal() {
  const qna_list = ["예금", "적금", "송금", "ATM", "주식"];
  const [item, setItem] = useState("");
  const qnaState = useSelector((state) => state.modal.qna);
  const dispatch = useDispatch();

  const handleQnA = () => {
    setItem("");
    dispatch(closeQnA());
  };

  return (
    <>
      <Modal
        open={qnaState}
        onClose={handleQnA}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container justifyContent="flex-end">
            <IconButton aria-label="close" onClick={handleQnA}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center">
            {item === "" ? (
              <Grid item xs={3}>
                <Typography
                  id="title"
                  variant="h5"
                  component="h2"
                  textAlign="center"
                  sx={{
                    mb: 8,
                    fontWeight: "Bold",
                  }}>
                  무엇을 도와드릴까요?
                </Typography>
                <Stack spacing={4} sx={{ mb: 4 }}>
                  {qna_list.map((value) => (
                    <Button
                      key={value}
                      variant="contained"
                      sx={{
                        background: "#4cb5f5",
                        fontWeight: "Bold",
                      }}
                      onClick={() => {
                        setItem(value);
                      }}>
                      {value}
                    </Button>
                  ))}
                </Stack>
              </Grid>
            ) : (
              <>
                <QnAItem keyword={item} />
                <Button
                  variant="contained"
                  sx={{
                    background: "#4cb5f5",
                    fontWeight: "Bold",
                    mt: 4,
                  }}
                  onClick={() => {
                    setItem("");
                  }}>
                  돌아가기
                </Button>
              </>
            )}
          </Grid>
          {/* <ModalBody /> */}
        </Box>
      </Modal>
    </>
  );
}
