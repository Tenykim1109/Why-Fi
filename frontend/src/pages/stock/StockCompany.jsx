import React from "react";
import { Link } from "react-router-dom";
import {Container , makeStyles, List,ListItem, ListItemText} from "@mui/material";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



const StockCompany = () => {
  const classes = useStyles();
 
  const CompanyItem = ()=> {
     const company_sample =[
    {
      'id' : '엔터',
      'current_price' : '1000원',
    },
    {
      'id' : '제조',
      'current_price' : '1000원',
    },
    {
      'id' : '제약',
      'current_price' : '1000원',
    },
  ] 
    return (
      <ListItem 
        company_sample={company_sample}
        button={true}
        component = {Link}
        to={`/stock/${company_sample.id}`}
      >

      </ListItem>
    )
  };
  
  return (
    <Container>
      <div>
        <h1>companylist</h1>
        <List className={classes.root}>
          <CompanyItem/>
        </List>
      </div>
    </Container>
  );
};

export default StockCompany;