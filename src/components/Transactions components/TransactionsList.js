import { Paper, Grid, Typography, Divider, List } from "@mui/material";
import React, { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";

function TransactionsList(props) {
  //========- states -=========//

  let data = props.transactions.length
  return (

    <Paper
      sx={{
        height: "100%",
        backgroundColor: 'rgb(231, 235, 240)',
        padding: "10px",
        pb: "30px",
        overflow: "hidden",
      }}
      elevation={1}
    >


      <Typography variant={"h6"} color={'primary'}>Transaction</Typography>
      <Divider variant="fullWidth" />

      {data ?
        <List style={{ height: "100%", overflowY: "auto" }}>
          {props.transactions.map(data => { return <TransactionCard key={data.id} transaction={data} delete={props.delete} update={props.update} /> })}
        </List>
        : <Typography>No Data</Typography>
      }
    </Paper>
  );
}

export default TransactionsList;
