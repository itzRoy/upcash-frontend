import { Paper, Grid, Typography, Divider, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";
import axios from "axios";

function TransactionsList() {
  //========- states -=========//
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});


  useEffect(() => {

    axios.get("http://localhost:8000/api/transactions")
      .then((response) => {

        setData(response.data.Data);
        setTimeout(() => setIsLoading(false), 400);
        console.log(data);
      });

  }, []);



  return (

    <Paper
      sx={{
        height: "100%",
        backgroundColor: 'rgb(231, 235, 240)',
        padding: "10px",
        pb: "30px",
        overflow: "hidden",
      }}
      elevation={0}
    >

      <Typography variant={"h6"} color={'primary'}>Transaction</Typography>
      <Divider variant="fullWidth" />

      {isLoading ? <Typography>loading</Typography>
        :
        <List style={{ height: "100%", overflowY: "auto" }}>
          {data.map(data => { return <TransactionCard key={data.id} transaction={data} /> })}
        </List>}

    </Paper>
  );
}

export default TransactionsList;
