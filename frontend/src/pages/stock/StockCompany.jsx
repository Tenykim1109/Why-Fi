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
  const [currentPriceA, setCurrentPriceA] = useState(0);
  const [currentPriceB, setCurrentPriceB] = useState(0);
  const [currentPriceC, setCurrentPriceC] = useState(0);

  const getStockDataA = () => {
    axios({
      url: `http://127.0.0.1:8000/api/bankbooks/stockinfo/A/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      // console.log(res.data[0].current_price);
      setCurrentPriceA(res.data[0].current_price);
    });
  };
  const getStockDataB = () => {
    axios({
      url: `http://127.0.0.1:8000/api/bankbooks/stockinfo/B/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      setCurrentPriceB(res.data[0].current_price);
    });
  };
  const getStockDataC = () => {
    axios({
      url: `http://127.0.0.1:8000/api/bankbooks/stockinfo/C/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      setCurrentPriceC(res.data[0].current_price);
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
          onClick={(e) => setCompanyType("엔터")}
          title="엔터주"
          currentPrice={currentPriceA}
          companyType="싸피엔터"
        />
        <InfoBox
          isRed
          active={companyType === "제조"}
          onClick={(e) => setCompanyType("제조")}
          title="제조주"
          currentPrice={currentPriceB}
          companyType="싸피전자"
        />
        <InfoBox
          isRed
          active={companyType === "제약"}
          onClick={(e) => setCompanyType("제약")}
          title="제약주"
          currentPrice={currentPriceC}
          companyType="싸피제약"
        />
      </div>
      {/* <Card>
        <CardContent>
          <h3>{companyType}주의 주식차트</h3>
          <StockChart className="stock__chart" companyType={companyType} />
        </CardContent>
        <CardContent>
          <StockOrder companyType={companyType} />
        </CardContent>
      </Card> */}
      <Container>
        <Grid xs={8}>
          <h3>{companyType}주의 주식차트</h3>
          <StockChart className="stock__chart" companyType={companyType} />
          <StockOrder companyType={companyType} />
        </Grid>
      </Container>
    </div>
  );
}

export default StockCompany;
