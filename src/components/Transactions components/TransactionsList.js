import { Paper, Grid, Typography, Divider, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";

function TransactionsList(props) {
  //========- states -=========//





  return (

    <Paper
      sx={{
        height: "100%",
        backgroundColor: 'rgb(213, 217, 224)',
        padding: "10px",
        pb: "30px",
        overflow: "hidden",
      }}
      elevation={0}
    >

      <Typography variant={"h6"} color={'primary'}>Transaction</Typography>
      <Divider variant="fullWidth" />


      <List style={{ height: "100%", overflowY: "auto" }}>
        {props.transactions.map(data => { return <TransactionCard key={data.id} transaction={data} /> })}
      </List>

    </Paper>
  );
}

export default TransactionsList;
