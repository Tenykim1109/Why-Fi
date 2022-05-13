import React from "react";
import { Box, Button, Container, Typography, Grid, Stack } from "@mui/material";

export function QnAModal() {
  const qna_list = ["예금", "적금", "송금", "ATM", "주식"];

  const QnAItem = ({ keyword = "" }) => {
    let ui;
    switch (keyword) {
      case "예금":
    }
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center">
        <Grid item xs={3}>
          <Typography
            id="title"
            variant="h5"
            component="h2"
            textAlign="center"
            sx={{
              mb: 8,
            }}>
            무엇을 도와드릴까요?
          </Typography>
          <Stack spacing={4} sx={{ mb: 4 }}>
            {qna_list.map((item) => (
              <Button
                variant="contained"
                sx={{
                  background: "#4cb5f5",
                }}>
                {item}
              </Button>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
