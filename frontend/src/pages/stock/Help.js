import React from "react";
import StockNav from "./StockNav";
import HelpStock from "./HelpStock";
import styled from "styled-components";

const Help = () => {
  return (
    <div>
      <StockNav />
      <DIV>
        <HelpStock />
      </DIV>
    </div>
  );
};

const DIV = styled.div`
  width: 600px;
  height: 80vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Help;
