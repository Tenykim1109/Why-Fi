import React, { useCallback, useEffect, useState } from "react";
import Cleave from "cleave.js/react";
import "./StockOrder.css";
import axios from "axios";

const StockOrderForm = ({ buyType, currentPrice, companyType, ...props }) => {
  const typeToStr = useCallback(() => {
    if (buyType === "BUY") {
      return "매수";
    } else if (buyType === "SELL") {
      return "매도";
    }
  }, [buyType]);

  const [inputVolume, setInputVolume] = useState(0); // 매수수량
  const [stockType, setStockType] = useState("");
  const [balance, setBalance] = useState(0);
  const getUserData = () => {
    axios({
      url: `http://127.0.0.1:8000/api/accounts/self/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        setBalance(res.data.balance.toString());
        // console.log("마이페이지:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserData();
    getStockData();
  }, []);
  const getStockData = () => {
    axios({
      url: `http://127.0.0.1:8000/api/bankbooks/mystocklist/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        // console.log("주식:", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const buyStock = () => {
    axios({
      url: "http://127.0.0.1:8000/api/bankbooks/buystocks/",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      data: {
        stock_type: stockType,
        stocks: inputVolume,
      },
    }).then((res) => {
      console.log(res.data);
    });
  };
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(currentPrice * inputVolume);
  }, [currentPrice, inputVolume]);

  const trade = useCallback(() => {
    if (companyType === "엔터") {
      return setStockType("A");
    } else if (companyType === "제조") {
      return setStockType("B");
    } else if (companyType === "제약") {
      return setStockType("C");
    }
    if (buyType === "BUY") {
      if (totalPrice > balance) {
        return alert("보유 금액이 부족합니다.");
      } else {
        return (
          buyStock(),
          setBalance(balance - totalPrice),
          alert(`${inputVolume}주 구매성공`)
        );
      }
    } else if (buyType === "SELL") {
      return setBalance(balance + totalPrice);
    }
    // sell에 내가 보유하고 있는 주식인지 여부판단 들어가야함
  });
  return (
    <div className="Trade__Form">
      <div className="Form__List">
        <div className="Form__Title">
          <p>보유금액</p>
        </div>
        <div className="Form__Des">
          <Cleave
            options={{
              numeral: true,
              numeralTousandsGroupStyle: "thousand",
            }}
            value={balance}
            readOnly
          />
        </div>
      </div>
      <div className="Form__List">
        <div className="Form__Title">
          <p>{typeToStr()}가격</p>
        </div>
        <div className="Form__Des">
          <Cleave
            options={{
              numeral: true,
              numeralTousandsGroupStyle: "thousand",
            }}
            value={currentPrice}
            readOnly
          />
        </div>
        <div className="Form__List">
          <div className="Form__Title">
            <p>{typeToStr()} 수량</p>
          </div>
          <div className="Form__Des">
            <Cleave
              options={{
                numeral: true,
                numeralThousandsGroupStyle: "thousand",
              }}
              value={inputVolume}
              onChange={(e) => setInputVolume(Number(e.target.rawValue))}
            />
          </div>
        </div>
        <div className="Form__List">
          <div className="Form__Title">
            <p>{typeToStr()} 총액</p>
          </div>
          <div className="Form__Des">
            <p>{totalPrice.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="Form__Submit">
        <button
          type="submit"
          style={{ backgroudColor: buyType === "SELL" ? "#f14f4f" : "#7878e3" }}
          onClick={trade}>
          {typeToStr()}
        </button>
      </div>
    </div>
  );
};

export default StockOrderForm;
