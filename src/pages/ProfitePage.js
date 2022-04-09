import { TextField, InputAdornment, Card, Typography, Grid, Paper, Divider, List, Box, CircularProgress } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { createRef, useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { green, red } from '@mui/material/colors'

import axios from 'axios';


const style = {
  main: {
    flexGrow: 1,
    height: "xl",
    maxWidth: "xl",
    mt: "74px",
    mb: "10px",
    mr: "10px"
  },
  noDataBox: {
    height: '100%',
    width: '100%',
    display: "grid",
    placeContent: 'center'
  }
}


const ProfitGoalPage = (props) => {
  const NavRef = createRef();

  const [currentMonth, setCurrentMonth] = useState([]);
  const [amount, setAmount] = useState(1000)
  const [transactions, setTransactions] = useState([]);
  const [profitGoals, setProfitGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {

    setCurrentMonth(months[new Date().getMonth()]);


    axios.get("profit-goals")
      .then(res => setProfitGoals(res.data))
      .then(() => {
        if (profitGoals && !profitGoals.some(i => new Date(i.year).getFullYear() == new Date().getFullYear() && new Date(i.year).getMonth() == new Date().getMonth() + 1)) {
          axios.post(`profit-goals?name=${months[new Date().getMonth()]}&amount=0&year=${new Date().getFullYear()}-0${new Date().getMonth() + 1}-01`)
        } else {
          console.log("hi");
        }
      })

    axios.get("transactions")
      .then(response => setTransactions(response.data.Data))




  }, [])

  // console.log(new Date().getMonth());
  //       console.log(profitGoals.some(i=> new Date(i.year).getFullYear == new Date().getFullYear && new Date(i.year).getMonth() == new Date().getMonth() ));

  // console.log(isLoading && profitGoals.some(i=> new Date(i.year).getFullYear == new Date().getFullYear && new Date(i.year).getMonth() == new Date().getMonth() ))
  // if(isLoading  && !profitGoals.some(i=> new Date(i.year).getFullYear == new Date().getFullYear && new Date(i.year).getMonth() == new Date().getMonth()+1 )){
  //   axios.post(`profit-goals?name=${months[new Date().getMonth()]}&amount=0&year=${new Date().getFullYear()}-0${new Date().getMonth()+1}-01`)

  // }else{
  //   console.log("hello")

  // }

  const income = transactions.filter(i => {
    return (i.category.type == "income" && new Date(i["created_at"]).getMonth() === new Date().getMonth())
  }).reduce((total, current) => { return total += current.amount }, 0).toFixed(2)


  const expense = (transactions.filter(i => {
    return (i.category.type == "expense" && new Date(i["created_at"]).getMonth() === new Date().getMonth())
  }).reduce((total, current) => { return total += current.amount }, 0) * -1).toFixed(2)

  const balance = parseInt(income) + parseInt(expense);

  const percentage = balance * 100 / parseInt(amount);

  const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31)


  const diffInMs = new Date(lastDayOfYear) - new Date(new Date())

  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  const estimation = ((amount - balance) / diffInDays).toFixed()

  const handleChange = (e) => {
    e.preventDefault();
    setAmount(e.target.value)
    console.log(amount);
  }


  return (
    <>
      <NavBar admin={localStorage.getItem('admin')} />
      <Grid maxWidth="xl" height="100vh" flexWrap="nowrap" container overflowX="auto">
        <Grid item>
          <SideBar />
        </Grid>

        <Grid
          item
          sx={style.main}
          component={"main"}
        >
          <Paper
            style={{ height: "calc(100vh - 84px)" }}
            sx={{ p: '20px', overflowY: 'auto' }}
            name="mainContainer">

            {profitGoals.length ?
              <>
                <Box m={1}>
                  <Box>
                    <Card sx={{
                      width: 'auto',
                      height: "auto",
                      padding: "10px",
                      backgroundColor: 'rgb(231, 235, 240)'
                    }}>

                      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Typography display={"block"} textAlign={"center"} variant='h6' color="primary">{`Current Goal: `}</Typography>
                        <TextField
                          id="filled-start-adornment"
                          sx={{ m: 1, display: "block", maxWidth: "100px" }}
                          InputProps={{
                            endAdornment: <InputAdornment position='start'><Typography>$</Typography></InputAdornment>,
                          }}
                          value={amount}
                          onChange={handleChange}
                          type={"number"}
                          size="small"
                          variant="standard"
                          px={0}
                        />
                        <Typography display={"block"} textAlign={"center"} variant='h6' color="primary">{` for ${new Date().getFullYear()}`}</Typography>

                      </Box>
                      <Divider />
                      <Box mt={'10px'} display={'flex'} >
                        <Typography flexGrow={1}>income:</Typography>
                        <Typography color={green[700]}>{income}$</Typography>
                      </Box>

                      <Box display={'flex'} my={'10px'}>
                        <Typography flexGrow={1}>expense:</Typography>
                        <Typography color={red[700]}>{expense}$</Typography>
                      </Box>
                      <Box display={'flex'} justifyContent={'right'}>
                        <Typography flexGrow={1}>balance:</Typography>
                        <Typography variant='h6' color={balance > 0 ? green[700] : red[700]}>{`${balance}`}$</Typography>
                      </Box>
                      <Divider xs={{ mb: "2rem" }}>Progress</Divider>
                      <ProgressBar completed={parseInt(percentage)} />
                      <Typography mt={2} display={"block"} textAlign={"center"} variant='body1' color="primary">{`estimation: you have to earn ${estimation}$ per day in order to achieve your ${new Date().getFullYear()}  goal`}</Typography>

                    </Card>
                  </Box>
                </Box>
                <List style={{ height: "fit-content", overflowY: "auto" }}>
                </List></>
              : <Box sx={style.noDataBox}>
                <CircularProgress color="inherit" />
              </Box>
            }

          </Paper>
        </Grid>
      </Grid>
    </>
  )
};

export default ProfitGoalPage;
