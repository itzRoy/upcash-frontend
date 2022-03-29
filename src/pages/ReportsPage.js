import { Container, Grid, Paper, Box } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { createRef, useEffect, useState } from "react";
import Line from '../components/Reports/Line';
import Pie from '../components/Reports/Pie'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const style = {
  main: {
    height: "xl",
    mt: "74px",
    mb: "10px",
    mr: "10px"
  }
}

const ReportsPage = (props) => {
  const NavRef = createRef();


  const [categories_transactions, setcategories_transactions] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [transactions, setTransactions] = useState([])
  const [value, setValue] = useState([null, null]);

  useEffect(
    () => {


      axios.get("categoriesTransactions")
        .then(response => {
          setcategories_transactions(response.data.data)
        })

      axios.get("categories")
        .then((response) => setCategorie(response.data))

      axios.get("transactions")
        .then(response => setTransactions(response.data.Data))


    }, []);



  

  // format date base on array
  const getDateArray = (input) => {
    const array = input.filter(i => typeof i["created_at"] !== "null" && typeof i["created_at"] !== "undefined")

    const arr = array.map(item => {
      let date_ob = new Date(item["created_at"])
      let month = (date_ob.toLocaleString('en-us', { month: 'short' }));
      let date = ("0" + date_ob.getDate()).slice(-2);
      let hours = date_ob.getHours();
      let minutes = date_ob.getMinutes();
      let seconds = date_ob.getSeconds();

      return month + "-" + date + "-" + hours + ":" + minutes 
      // + ":" + seconds;
    })
    return arr;
  }

  //format date for one item (string)
  const getDateItem = (item) => {
    let date_ob = new Date(item)
    let month = (date_ob.toLocaleString('en-us', { month: 'short' }));
    let date = ("0" + date_ob.getDate()).slice(-2);
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    return month + "-" + date + "-" + hours + ":" + minutes 
    // + ":" + seconds;
  }



  // lables for line chart
  const labelsForLine = [...new Set(getDateArray(transactions))]

// labels for income pie
const labelsForIncomePie = categories_transactions.filter(i=> i.type == "income" && i.transactions.length > 0).map(item=> item.name)

//labels for expenses pie
const labelsForExpensePie = categories_transactions.filter(i=> i.type == "expense" && i.transactions.length > 0).map(item=> item.name)


console.log(categories_transactions);

// function get values pass lables array and type(income or expense) output total based on lables
  const Values = (arr, type) => {
    const filtered = arr.map(
      x => transactions.filter(item => getDateItem(item["created_at"]) == x && item.category.type == type))
    const reduced = filtered.map(i => {
      if (i.length > 0) {
        return i.reduce((total, current) => { return total += current.amount }, 0)
      } return 0
    })
    return reduced;
  }

  //generate random colors for pie
const justColors =[
'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];



//for income
const colorsForIncome = labelsForIncomePie.map((item, index) => justColors[index])

//for expense
const colorsForExpense = labelsForExpensePie.map((item, index) => justColors[(colorsForIncome.length + index)])


//getValues income pie
const pieValues = (arr) => {
  const filtered = arr.map(
    x => transactions.filter(item => item.category.name == x))
  const reduced = filtered.map(i => {
    if (i.length > 0) {
      return i.reduce((total, current) => { return total += current.amount }, 0)
    } return 0
  })
  return reduced;
}

console.log(pieValues(labelsForIncomePie));



  return (
  
    <>
      <NavBar admin={localStorage.getItem('admin')} />
      <Grid maxWidth="xl" height="100vh" container>
        <Grid item>
          <SideBar />
        </Grid>

        <Grid
         item
         lx={12}
         md={10}
         sm={9}
         xs={8}
          sx={style.main}
          component={"main"}
        >
          <Paper
            style={{ height: "calc(100vh - 84px)" }}
            sx={{ p: '20px', overflowY: 'auto' }}
            name="mainContainer">

              {/* localization time picker from mui */}
               <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        style={{ 'margin': '0 auto', 'textAlign': 'center' }}
        startText="start"
        endText="end"

        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>

            <TextField {...startProps} />
            <Box sx={{ mx: 2 , height: "1rem"}}> to </Box>
            <TextField {...endProps} />
          </Box>
        )}
      />
              <Grid container justifyContent={"center"}  >
              <Grid item xs={12}  mb={6}>
                <Line style={{maxHeight: "30px"}} labels={labelsForLine} incomevalues={Values(labelsForLine, "income")} expensevalues={Values(labelsForLine, "expense")}/>
                </Grid>
                <Grid xs={12} container justifyContent={"space-around"} >
                  <Grid item xs={10} mb={6} md={5}>
               <Pie colors1={colorsForIncome} labels={labelsForIncomePie} data={pieValues(labelsForIncomePie)} title={"income"}/>
               </Grid>
               <Grid item xs={10} mb={6}  md={5}>
               <Pie colors1={colorsForExpense} labels={labelsForExpensePie} data={pieValues(labelsForExpensePie)} title={"expense"} />
               </Grid>
                </Grid>
                
              </Grid>
              </LocalizationProvider>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ReportsPage;
