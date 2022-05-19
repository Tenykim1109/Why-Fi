import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  List,
  ListItem,
  ListItemText,
  CardContent,
  Grid,
} from "@mui/material";
import StockChart from "./StockChart";
import InfoBox from "./InfoBox";
import "./StockCompany.css";
import StockOrder from "./StockOrder";
import axios from "axios";

function StockCompany() {
  const [companyType, setCompanyType] = useState("엔터");
  const [stockType, setStockType] = useState("A");
  const [currentPriceA, setCurrentPriceA] = useState(0);
  const [currentPriceB, setCurrentPriceB] = useState(0);
  const [currentPriceC, setCurrentPriceC] = useState(0);

  const getStockDataA = () => {
    axios({
      url: `https://k6d108.p.ssafy.io/api/bankbooks/stockinfo/A/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      console.log("주식현재가", res.data[res.data.length - 1].current_price);
      setCurrentPriceA(res.data[res.data.length - 1].current_price);
    });
  };
  const getStockDataB = () => {
    axios({
      url: `https://k6d108.p.ssafy.io/api/bankbooks/stockinfo/B/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      setCurrentPriceB(res.data[res.data.length - 1].current_price);
    });
  };
  const getStockDataC = () => {
    axios({
      url: `https://k6d108.p.ssafy.io/api/bankbooks/stockinfo/C/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      setCurrentPriceC(res.data[res.data.length - 1].current_price);
    });
  };
  useEffect(() => {
    getStockDataA();
    getStockDataB();
    getStockDataC();
  }, []);

  return (
    <div>
      <div className="company_name">
        <InfoBox
          isRed
          active={companyType === "엔터"}
          onClick={(e) => (setCompanyType("엔터"), setStockType("A"))}
          title="엔터주"
          currentPrice={currentPriceA}
          companyType="싸피엔터"
        />
        <InfoBox
          isRed
          active={companyType === "제조"}
          onClick={(e) => (setCompanyType("제조"), setStockType("B"))}
          title="제조주"
          currentPrice={currentPriceB}
          companyType="싸피전자"
        />
        <InfoBox
          isRed
          active={companyType === "제약"}
          onClick={(e) => (setCompanyType("제약"), setStockType("C"))}
          title="제약주"
          currentPrice={currentPriceC}
          companyType="싸피제약"
        />
      </div>

      {/* <Container>
        <Container>
          <StockChart
            className="stock__chart"
            companyType={companyType}
            stockType={stockType}
          />
        </Container>
        <Container>
          <StockOrder
            className="stock__order"
            companyType={companyType}
            currentPriceA={currentPriceA}
            currentPriceB={currentPriceB}
            currentPriceC={currentPriceC}
          />
        </Container>
      </Container> */}
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <StockChart
            className="stock__chart"
            companyType={companyType}
            stockType={stockType}
          />
        </Grid>
        <Grid item xs={4}>
          <StockOrder
            className="stock__order"
            companyType={companyType}
            currentPriceA={currentPriceA}
            currentPriceB={currentPriceB}
            currentPriceC={currentPriceC}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default StockCompany;
