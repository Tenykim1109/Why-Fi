import React, { useState } from "react";
import "./StockOrder.css";
import StockOrderForm from "./StockOrderForm";
const StockOrder = () => {
  const [buyType, setBuyType] = useState("BUY");

  return (
    <div className="Trade__Box">
      <div className="Trade__Head">
        <div className="Trade__Method">
          <p
            className={buyType === "BUY" ? "on" : null}
            onClick={() => setBuyType("BUY")}>
            매수
          </p>
        </div>
        <div className="Trade__Method">
          <p
            className={buyType === "SELL" ? "on" : null}
            onClick={() => setBuyType("SELL")}>
            매도
          </p>
        </div>
      </div>
      <StockOrderForm buyType={buyType} />
    </div>
  );
};
export default StockOrder;
