import React from "react";
import { Link } from "react-router-dom";
import "./StockNav.css";

const StockNav = () => {
  return (
    <div className="header">
      <div className="container">
        <Link to="/stock">
          <div className="logo">
            <img
              src={"/logo.png"}
              style={{ display: "flex", width: "40px", margin: "25px" }}></img>
            <span>Whi-Fi 주식시장</span>
          </div>
        </Link>
        <ul className="nav">
          <li>
            <Link to="/stock/stocinfo">오늘의 주식뉴스</Link>
          </li>
          {/* <li>
            <Link to="/stock/stockcompany">stockcompany</Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default StockNav;
