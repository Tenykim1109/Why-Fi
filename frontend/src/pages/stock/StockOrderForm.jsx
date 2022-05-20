import React, { useCallback, useEffect, useState } from "react";
import Cleave from "cleave.js/react";
import "./StockOrder.css";
import axios from "axios";

const StockOrderForm = ({
  buyType,
  currentPrice,
  companyType,
  stockType,
  ...props
}) => {
  const typeToStr = useCallback(() => {
    if (buyType === "BUY") {
      return "매수";
    } else if (buyType === "SELL") {
      return "매도";
    }
  }, [buyType]);

  const [inputVolume, setInputVolume] = useState(0); // 매수수량
  // const [stockType, setStockType] = useState("A");
  const [balance, setBalance] = useState(0);
  const [checkStockA, setCheckStockA] = useState(0);
  const [checkStockB, setCheckStockB] = useState(0);
  const [checkStockC, setCheckStockC] = useState(0); // 보유주식 파악
  const getUserData = () => {
    axios({
      url: `https://k6d108.p.ssafy.io/api/accounts/self/`,
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
  }, [balance]);

  const getStockData = () => {
    axios({
      url: `https://k6d108.p.ssafy.io/api/bankbooks/mystocklist/`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    })
      .then((res) => {
        console.log("주식정보:", res.data);
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].stock_type === "A") {
            setCheckStockA(res.data[i].stocks);
          } else if (res.data[i].stock_type === "B") {
            setCheckStockB(res.data[i].stocks);
          } else if (res.data[i].stock_type === "C") {
            setCheckStockC(res.data[i].stocks);
          }
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const buyStock = () => {
    axios({
      url: "https://k6d108.p.ssafy.io/api/bankbooks/buystocks/",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      data: {
        stock_type: stockType,
        stocks: inputVolume,
      },
    }).then((res) => {
      // console.log(res.data);
    });
  };

  const sellStock = () => {
    axios({
      url: "https://k6d108.p.ssafy.io/api/bankbooks/sellstocks/",
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      data: {
        stock_type: stockType,
        stocks: inputVolume,
      },
    }).then((res) => {
      // console.log(res.data);
    });
  };
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(currentPrice * inputVolume);
  }, [currentPrice, inputVolume]);

  const trade = useCallback(() => {
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
      if (stockType === "A") {
        if (inputVolume > checkStockA) {
          return alert(
            `보유주식보다 많이 팔수 없어요. 현재 나의 보유주식수는 ${checkStockA}입니다 `
          );
        } else {
          return (
            setBalance(balance + totalPrice),
            alert(`${inputVolume}주 판매성공`),
            sellStock()
          );
        }
      } else if (stockType === "B") {
        if (inputVolume > checkStockB) {
          return alert(
            `보유주식보다 많이 팔수 없어요. 현재 나의 보유주식수는 ${checkStockB}입니다 `
          );
        } else {
          return (
            setBalance(balance + totalPrice),
            sellStock(),
            alert(`${inputVolume}주 판매성공`)
          );
        }
      } else if (stockType === "C") {
        if (inputVolume > checkStockC) {
          return alert(
            `보유주식보다 많이 팔수 없어요. 현재 나의 보유주식수는 ${checkStockC}입니다 `
          );
        } else {
          return (
            setBalance(balance + totalPrice),
            alert(`${inputVolume}주 판매성공`),
            sellStock()
          );
        }
      }
    }
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
          style={{
            backgroundColor: buyType === "SELL" ? "#f14f4f" : "#7878e3",
            color: "#FFFFFF",
            borderRadius: "8px",
          }}
          onClick={trade}>
          {typeToStr()}
        </button>
      </div>
    </div>
  );
};

export default StockOrderForm;
