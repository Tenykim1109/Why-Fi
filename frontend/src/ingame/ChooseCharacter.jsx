import React from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Box,
  Stack,
  Button,
  ButtonBase,
  Typography,
} from "@mui/material";
import { RootState } from "../modules/store";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCharacterType } from "../modules/slices/userSlice";
import { TEXTURE_BOY, TEXTURE_GIRL } from "./constants";

const images = [
  {
    url: "/assets/boy.png",
    title: "남자",
    type: TEXTURE_BOY,
    width: "30%",
  },
  {
    url: "/assets/woman.png",
    title: "여자",
    type: TEXTURE_GIRL,
    width: "30%",
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 600,
  padding: "8px",
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const Image = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export default function ChooseCharacter() {
  const state = useSelector((state) => state.user.characterType);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className="asdf"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
      <div style={{ textAlign: "center" }}>
        <h2>캐릭터를 선택해주세요</h2>
      </div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          minWidth: 300,
          width: "100%",
          p: 4,
        }}>
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            style={{
              width: image.width,
            }}
            onClick={() => {
              dispatch(setCharacterType(image.type));
              console.log(state);
              navigate("/ingame");
            }}>
            <ImageSrc
              style={{ backgroundImage: `url(${image.url})`, padding: "4px" }}
            />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="h4"
                color="inherit"
                sx={{
                  position: "relative",
                  mt: 55,
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}>
                {image.title}
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
    </div>
  );
}
