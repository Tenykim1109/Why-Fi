import React from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "../styles";
import TopBanner from "../components/TopBanner"
import Services from "../components/Services";

const Homepage = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>
      <div>
        <TopBanner/>
        <Services/>
      </div>
    </ThemeProvider>
  );
};

export default Homepage;