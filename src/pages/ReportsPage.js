import { Container, Grid, Paper, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { createRef, useEffect, useState } from "react";
import Line from '../components/Reports/Line';
import Pie from '../components/Reports/Pie'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


const ReportsPage = (props) => {
  const NavRef = createRef();


  const [categories_transactions, setcategories_transactions] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [transactions, setTransactions] = useState([])
  const [value, setValue] = useState(['', ''])
  const [dropdown, setDropdown] = useState('day');
  const [minDate, setMinDate] = useState(new Date(-8640000000000000));
  const [maxDate, setMaxDate] = useState(new Date(8640000000000000));


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
      axios.get("transactions").then((response) => {
        const minD = (response.data.Data).reduce((acc, current) => new Date(acc).getTime() > new Date(current["created_at"]).getTime() ? acc = new Date(current["created_at"]) : acc, maxDate)
        const maxD = (response.data.Data).reduce((acc, current) => new Date(acc).getTime() < new Date(current["created_at"]).getTime() ? acc = new Date(current["created_at"]) : acc, minDate)

        setMinDate(new Date(minD).getTime())
        setMaxDate(new Date(maxD).getTime())
        setValue([new Date(minD), new Date(maxD)])
      })

    }, []);

  const handleChange = (event) => {
    setDropdown(event.target.value);
  }


  //format date for one item (string)
  const getDateItem = (item) => {
    let date_ob = new Date(item)
    let year = date_ob.getFullYear();
    let month = (date_ob.toLocaleString('en-us', { month: 'short' }));
    let date = ("0" + date_ob.getDate()).slice(-2);
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    if (dropdown === "day") {
      return month + "-" + date;
    } else if (dropdown == "year") {
      return year
    } else if (dropdown == "hour") {
      return month + "-" + date + "H" + hours
    } else if (dropdown === "minute") {
      return month + "-" + date + "H" + hours + ":" + minutes
    } else if (dropdown === "second") {
      return month + "-" + date + "H" + hours + ":" + minutes + ":" + seconds
    }
    else return month
  }


  // format date based on array of objects with "created_at" value
  const getDateArray = (input) => {
    if (value[0] && value[1]) {
      const array = input.filter(i => new Date(i["created_at"]).getTime() >= new Date(value[0]).getTime() && new Date(i["created_at"]).getTime() - 86400000 <= new Date(value[1].getTime() || new Date(maxDate)))
        .sort((a, b) => (a["created_at"] > b["created_at"]) ? 1 : ((b["created_at"] > a["created_at"]) ? -1 : 0))
      const arr = array.map(item => {
        let date_ob = new Date(item["created_at"])
        let year = date_ob.getFullYear();
        let month = (date_ob.toLocaleString('en-us', { month: 'short' }));
        let date = ("0" + date_ob.getDate()).slice(-2);
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();

        if (dropdown === "day") {
          return month + "-" + date;
        } else if (dropdown == "year") {
          return year
        } else if (dropdown == "hour") {
          return month + "-" + date + "H" + hours
        } else if (dropdown === "minute") {
          return month + "-" + date + "H" + hours + ":" + minutes
        } else if (dropdown === "second") {
          return month + "-" + date + "H" + hours + ":" + minutes + ":" + seconds
        }
        else return month

      })
      return arr;
    } return

  }

  // lables for line chart
  const labelsForLine = [...new Set(getDateArray(transactions))]

  // labels for income pie
  const labelsForIncomePie = categories_transactions.filter(i => i.type == "income" && i.transactions.length > 0).map(item => item.name)

  //labels for expenses pie
  const labelsForExpensePie = categories_transactions.filter(i => i.type == "expense" && i.transactions.length > 0).map(item => item.name)



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

  //colors for pie
  const justColors = [
    '#FF6633', '#FF33FF', '#00B3E6',
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
      x => transactions.filter(item => item.category.name == x && new Date(item["created_at"]).getTime() >= new Date(value[0]).getTime() && new Date(item["created_at"]).getTime() - 86400000 <= new Date(value[1]).getTime() + 1))
    const reduced = filtered.map(i => {
      if (i.length > 0) {
        return i.reduce((total, current) => { return total += current.amount }, 0)
      } return 0
    })
    return reduced;
  }



  const style = {
    main: {
      mt: "74px",
      mb: "10px",
      mr: "10px",
      minWidth: "100px",
      flexGrow: 1
    }
  }


  return (

    <>
      <NavBar admin={localStorage.getItem('admin')} />
      <Box display={"flex"} maxWidth="xl" height="100vh" container>

        <SideBar />


        <Box

          sx={style.main}
          component={"main"}
        >
          <Paper
            style={{ height: "calc(100vh - 84px)" }}

            sx={{ overflowY: 'auto', overflowX: 'hidden', maxWidth: "100%", padding: "20px" }}
            name="mainContainer">

            {/* localization time picker from mui */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDateRangePicker
                minDate={new Date(minDate).getTime()}
                maxDate={new Date(maxDate).getTime()}
                style={{ 'margin': '0 auto', 'textAlign': 'center' }}
                startText="start"
                endText="end"

                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <Box width={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>

                    <TextField {...startProps} sx={{ px: 0 }} />
                    <Box sx={{ px: 0, mx: 2, height: "0.5rem" }}> to </Box>
                    <TextField {...endProps} />
                    <Box sx={{ mx: 2, height: "0.5rem" }}> per </Box>
                    <Box >
                      <FormControl fullWidth sx={{ mr: 2, ml: 2 }}>
                        <InputLabel >Per</InputLabel>
                        <Select
                          px={0}
                          id="demo-simple-select"
                          label="Per"
                          onChange={handleChange}
                        >
                          <MenuItem value={"mounth"}>mounth</MenuItem>
                          <MenuItem value={"day"}>day</MenuItem>
                          <MenuItem value={"hour"}>hour</MenuItem>
                          <MenuItem value={"minute"}>minute</MenuItem>
                          <MenuItem value={"second"}>second</MenuItem>


                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                )}
              />
              <Box container mx={{ xs: 0, md: 6 }}>
                <Box ml={{ xs: 1, md: 8 }} mr={{ xs: 1, md: 8 }}>
                  <Line labels={labelsForLine} incomevalues={Values(labelsForLine, "income")} expensevalues={Values(labelsForLine, "expense")} />
                </Box>
                <Box flexGrow={1} mt={6} display={"flex"} justifyContent={{ xs: "center", md: "space-around" }} flexDirection={{ xs: "column", md: "row" }} >
                  <Box maxWidth={{ md: "50%" }} >
                    <Pie colors1={colorsForIncome} labels={labelsForIncomePie} data={pieValues(labelsForIncomePie)} title={"income"} />
                  </Box>
                  <Box maxWidth={{ md: "50%" }} >
                    <Pie colors1={colorsForExpense} labels={labelsForExpensePie} data={pieValues(labelsForExpensePie)} title={"expense"} />
                  </Box>
                </Box>

              </Box>
            </LocalizationProvider>
          </Paper>
        </Box>
      </Box>

    </>
  );
};

export default ReportsPage;
