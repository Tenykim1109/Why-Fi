import React, { useCallback,useEffect,useState } from "react";
import Cleave from 'cleave.js/react'
import './StockOrder.css'





const StockOrderForm =({buyType})=>{
  const typeToStr = useCallback(() => {
    if (buyType === 'BUY') {
      return '매수';
    } else if (buyType === 'SELL') {
      return '매도';
    }
  }, [buyType]);
  
  const [inputPrice, setInputPrice] = useState(0); // 매수가격
  const [inputVolume, setInputVolume] = useState(0); // 매수수량
  
  
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(inputPrice * inputVolume);
  }, [inputPrice, inputVolume]);
  
  
  return (
    <div className="Trade__Form">
      <div className="Form__List">
        <div className="Form__Title">
          <p>보유금액</p> 
        </div>
        <div className="Form__Des">
            {/* 내가보유한금액들어가야함 */}
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
              numeralTousandsGroupStyle: 'thousand',
            }}
              onChange={e => setInputPrice(Number(e.target.rawValue))}
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
                numeralThousandsGroupStyle: 'thousand',
              }}
              value={inputVolume}
              onChange={e => setInputVolume(Number(e.target.rawValue))}
            />
            
          </div>
        </div>
        <div className="Form__List">
          <div className="Form__Title">
            <p>{typeToStr()} 총액</p>
          </div>
          <div className="Form__Des">
            <p>
              {totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="Form__Submit">
        <button
          type="submit"
          style={{backgroudColor : buyType ==="BUY" ? '#f14f4f' : '#7878e3'}}
          // onClick 이벤트드가야함
        >
          {typeToStr()}
        </button>
      </div>
    </div>
  );
};

export default  StockOrderForm;