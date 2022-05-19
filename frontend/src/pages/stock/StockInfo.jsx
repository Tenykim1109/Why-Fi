import { List, ListItem } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import StockNav from "./StockNav";
import "./StockInfo.css";
const StockInfo = () => {
  const news = [];
  const [newsDate, setNewsDate] = useState("");
  const [newsA, setNewsA] = useState("");
  const [newsB, setNewsB] = useState("");
  const [newsC, setNewsC] = useState("");
  const getStockNews = () => {
    axios({
      url: `http://127.0.0.1:8000/api/bankbooks/stocknews`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        // console.log("주식뉴스", res.data[i].stock_situation.article);
        news.push(res.data[i].stock_situation.article); //news[0]은 왜 안먹냐...
        setNewsA(res.data[0].stock_situation.article);
        setNewsB(res.data[1].stock_situation.article);
        setNewsC(res.data[2].stock_situation.article);
        setNewsDate(res.data[0].created_at);
        console.log(res);
      }
    });
  };
  useEffect(() => {
    getStockNews();
  });

  return (
    <div>
      <StockNav />
      <List
        className="stockinfo"
        component="nav"
        aria-label="main mailbox folders">
        <h2>{newsDate}의 간추린 뉴스</h2>
        <ListItem className="stockinfolist">{newsA}</ListItem>
        <ListItem className="stockinfolist">{newsB}</ListItem>
        <ListItem className="stockinfolist">{newsC}</ListItem>
      </List>
    </div>
  );
};

export default StockInfo;
