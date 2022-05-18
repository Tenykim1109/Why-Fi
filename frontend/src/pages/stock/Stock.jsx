import React from "react";
import StockCompany from "./StockCompany";
import StockMain from "./StockMain";
import StockNav from "./StockNav";

const Stock = () => {
  return (
    <div>
      <StockNav />
      <StockCompany />
    </div>
  );
};

export default Stock;
