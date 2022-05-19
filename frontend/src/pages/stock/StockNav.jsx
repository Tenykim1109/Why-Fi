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
            <span>Why-Fi 주식시장</span>
          </div>
        </Link>
        <ul className="nav">
          <li>
            <Link to="/stock/stockinfo">오늘의 주식뉴스</Link>
<<<<<<< HEAD
=======
          </li>
          <li>
            <Link to="/stock/help">도움말</Link>
>>>>>>> 48220f767b168109eee727e0d23491c8583edc18
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StockNav;
