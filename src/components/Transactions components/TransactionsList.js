import { Paper, Grid, Typography, Divider, List, Button, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import TransactionCard from "./TransactionCard";


function TransactionsList(props) {
  //========- states -=========//

  let data = props.transactions.length

  const style = {
    titleBox: {
      display: 'flex',
      padding: '5px',

    },
    title: {
      display: "inline",
      flexGrow: 1,
    },
    rangeBox: {
      display: "flex",
      gap: "5px",
    },
    noDataBox: {
      height: '100%',
      width: '100%',
      display: "grid",
      placeContent: 'center'
    }
  }

  const getRange = event => {
    const range = event.target.value
    props.setRange(range)
  }



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

      <Box sx={style.titleBox}>
        <Typography sx={style.title} variant={"h6"} color={'primary'}>Transactions</Typography>

        <Box sx={style.rangeBox}>
          <Button onClick={getRange} variant={props.range === "day" ? "contained" : "outlined"} size="small" name="today" value="day">Today</Button>
          <Button onClick={getRange} variant={props.range === "week" ? "contained" : "outlined"} size="small" name="week" value="week">Week</Button>
          <Button onClick={getRange} variant={props.range === "month" ? "contained" : "outlined"} size="small" name="month" value="month">Month</Button>
          <Button onClick={getRange} variant={props.range === "year" ? "contained" : "outlined"} size="small" name="year" value="year">Year</Button>
        </Box>



      </Box>
      <Divider variant="fullWidth" py={"5px"} />
      {
        data ?
          <List style={{ height: "100%", overflowY: "auto" }}>
            {props.transactions.map(data => { return <TransactionCard key={data.id} transaction={data} delete={props.delete} update={props.update} /> })}
          </List>
          : <Box sx={style.noDataBox}>
            <Typography variant={'h6'} textAlign="center">No transactions in the selected time period</Typography>
            <Typography variant={'p'} textAlign="center" fontSize="0.8rem" color={grey[700]}>Select another period or click the "Add new Transactions" to add a transaction</Typography>
          </Box>
      }
    </Paper>
  );
}

export default TransactionsList;
