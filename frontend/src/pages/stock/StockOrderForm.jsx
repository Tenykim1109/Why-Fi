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

  const [inputPrice, setInputPrice] = useState(0); // 매수가격
  const [inputVolume, setInputVolume] = useState(0); // 매수수량

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
        console.log("balance:", balance);
        console.log(res.data.book_number);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserData();
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(currentPrice * inputVolume);
  }, [currentPrice, inputVolume]);

  return (
    <div className="Trade__Form">
      <div className="Form__List">
        <div className="Form__Title">
          <p>보유금액</p>
        </div>
        <div className="Form__Des">
          <p>{balance.toLocaleString()}</p>
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
            // currentPrice={currentPrice}
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
          style={{ backgroudColor: buyType === "BUY" ? "#f14f4f" : "#7878e3" }}
          // onClick 이벤트드가야함
        >
          {typeToStr()}
        </button>
      </div>
    </div>
  );
};

export default StockOrderForm;
