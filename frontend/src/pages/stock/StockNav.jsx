import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./StockNav.css";
import { useDispatch } from "react-redux";
import { setComponent } from "../../modules/slices/stockSlice";

const StockNav = () => {
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="container">
        {/* <Link to="/stock"> */}
        <div
          className="logo"
          onClick={() => {
            dispatch(setComponent("default"));
          }}>
          <img
            src={"/logo.png"}
            style={{ display: "flex", width: "40px", margin: "25px" }}></img>
          <span>Why-Fi 주식시장</span>
        </div>
        {/* </Link> */}
        <ul className="nav">
          <li>
            {/* <Link to="/stock/stockinfo">오늘의 주식뉴스</Link> */}
            <Button
              variant="text"
              sx={{
                color: "#000000",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              onClick={() => {
                dispatch(setComponent("news"));
              }}>
              오늘의 주식시장
            </Button>
          </li>
          <li>
            {/* <Link to="/stock/help">도움말</Link> */}
            <Button
              variant="text"
              sx={{
                color: "#000000",
                fontSize: "20px",
                fontWeight: "bold",
              }}
              onClick={() => {
                dispatch(setComponent("help"));
              }}>
              도움말
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StockNav;
