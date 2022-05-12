import React from "react";
import { Link } from "react-router-dom";
import {Container , makeStyles, List,ListItem, ListItemText} from "@mui/material";
import StockChart from "./StockChart";
import InfoBox from "./InfoBox";
import "./StockCompany.css";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// const CompanyItem = ()=> {
     
//     return (
//       <ListItem 
//         company_sample={company_sample}
//         button={true}
//         component = {Link}
//         to={`/stock/${company_sample.id}`}
//       >

//       </ListItem>
//     )
//   };
// const company_sample =[
//     {
//       'id' : 0,
//       'name' : '엔터',
//       'current_price' : '1000원',
//     },
//     {
//       'id' : 1,
//       'name' : '제조',
//       'current_price' : '1000원',
//     },
//     {
//       'id' : 2,
//       'name' : '제약',
//       'current_price' : '1000원',
//     },
//   ] ;
const StockCompany = () => {
  
  return (
   <div>
    <div className="company_name">
      <InfoBox
        isRed
        title="엔터주"
        // currentPrice={}
        currentPrice="1000원"
        
      />
      <InfoBox
        isRed
        title="제조주"
        currentPrice="1000원"
      />
      <InfoBox
        isRed
        title="제약주"
        currentPrice="1000원"
      />
    </div>
    <StockChart/>
    
  </div>
  );
};

export default StockCompany;