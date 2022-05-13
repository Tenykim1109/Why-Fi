import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import {Container , Card, List,ListItem, ListItemText, CardContent} from "@mui/material";
import StockChart from "./StockChart";
import InfoBox from "./InfoBox";
import "./StockCompany.css";
import StockOrder from "./StockOrder";


function StockCompany() {
  const [companyType, setCompanyType]=useState("엔터");
  return (
   <div>
    <div className="company_name">
      <InfoBox
        isRed
        active={companyType==="엔터"}
        onClick={(e) => setCompanyType("엔터")}
        title="엔터주"
        // currentPrice={}
        currentPrice="1000"
        
      />
      <InfoBox
        isRed
        active={companyType==="제조"}
        onClick={(e) => setCompanyType("제조")}
        title="제조주"
        currentPrice="1000"
      />
      <InfoBox
        isRed
        active={companyType==="제약"}
        onClick={(e) => setCompanyType("제약")}
        title="제약주"
        currentPrice="1000"
      />
    </div>
    <Card>
      <CardContent>
        <h3>{companyType}의 주식차트</h3>
        <StockChart/>
      </CardContent>
      <CardContent>
        <StockOrder/>
      </CardContent>
    </Card>
    
    
  </div>
  );
};

export default StockCompany;