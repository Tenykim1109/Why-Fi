import React from "react";
import { Outlet } from "react-router-dom";

import Banner from "./style/Banner";
import Div from "./style/Div";
// import Start from "./Start";

const Atm = () => {
  return (
    <div>
      <Banner />
      <Div flex={true}>
        <Outlet />
      </Div>
    </div>
  );
};

export default Atm;
