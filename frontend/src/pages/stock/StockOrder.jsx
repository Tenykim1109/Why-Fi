import React, { useEffect, useState } from "react";
import "./StockOrder.css";
import StockOrderForm from "./StockOrderForm";
const StockOrder = (
  // companyType,
  // currentPriceA,
  // currentPriceB,
  // currentPriceC
  props
) => {
  const [buyType, setBuyType] = useState("BUY");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [stockType, setStockType] = useState("");
  // console.log(props);
  // console.log("현재가", currentPrice);
  useEffect(() => {
    if (props.companyType === "엔터") {
      return setCurrentPrice(props.currentPriceA), setStockType("A");
    } else if (props.companyType === "제조") {
      return setCurrentPrice(props.currentPriceB), setStockType("B");
    } else {
      return setCurrentPrice(props.currentPriceC), setStockType("C");
    }
  }, [props.companyType]);
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
      <StockOrderForm
        buyType={buyType}
        currentPrice={currentPrice}
        stockType={stockType}
        // currentPriceA={currentPriceA}
        // currentPriceB={currentPriceB}
        // currentPriceC={currentPriceC}
      />
    </div>
  );
};
export default StockOrder;
