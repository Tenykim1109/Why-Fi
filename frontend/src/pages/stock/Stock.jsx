import React from "react";
import { useSelector } from "react-redux";
import Help from "./Help";
import StockCompany from "./StockCompany";
import StockInfo from "./StockInfo";
import StockMain from "./StockMain";
import StockNav from "./StockNav";

const Stock = () => {
  const stockState = useSelector((state) => state.stock.component);

  return (
    <div>
      <StockNav />
      {stockState === "news" && <StockInfo />}
      {stockState === "help" && <Help />}
      {stockState === "default" && <StockCompany />}
    </div>
  );
};

export default Stock;
