import React from "react";
import { Link } from "react-router-dom";
import {Container , makeStyles, List,ListItem, ListItemText} from "@mui/material";
import StockChart from "./StockChart";


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
const company_sample =[
    {
      'id' : 0,
      'name' : '엔터',
      'current_price' : '1000원',
    },
    {
      'id' : 1,
      'name' : '제조',
      'current_price' : '1000원',
    },
    {
      'id' : 2,
      'name' : '제약',
      'current_price' : '1000원',
    },
  ] ;
const StockCompany = () => {
  
  return (
    <Container>
      <div>
        <h1>companylist</h1>
        <StockChart/>
        
      </div>
    </Container>

  );
};

export default StockCompany;