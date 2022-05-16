// import { Card, CardContent, Typography } from "@material-ui/core";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import "./InfoBox.css";

function InfoBox({
  title,
  companyType,
  isBlue,
  active,
  currentPrice,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isBlue && "infoBox--red"
      }`}>
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        <h2 className={`infoBox__cases ${!isBlue && "infoBox__cases--green"}`}>
          {companyType}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {currentPrice} 원
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
