import { Alert, Box, Button, CircularProgress, Container, Dialog, Divider, Grid, Paper, Snackbar, Typography } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { useEffect, useState } from "react";
import TransactionsList from "../components/Transactions components/TransactionsList";
import CurrentBalance from "../components/Transactions components/CurrentBalance";
import axios from "axios";
import AddTransactionFrom from "../components/Transactions components/addTransactionFrom";
import { green } from "@mui/material/colors";
import { DateTime } from "luxon";


const style = {
  body: {
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  //=================================
  paper: {
    p: '20px',
    overflow: 'hidden',

  },
  //=================================
  main: {
    height: "100%",
    width: "100%",
    mt: "74px",
    mb: "10px",
    mr: "10px"
  },
  //=================================
  subGrid: {
    gap: {
      xs: 2,
      md: 3
    },
    height: "100%",
    flexWrap: "nowrap",
    overflow: "clip",
    backgroundColor: {
    },
    padding: "2px",
    flexDirection: {
      xs: "column",
      md: 'row'
    },
  },
  //=================================
  list: {
    flex: {
      xs: 1,
      md: 2
    },
    order: {
      xs: 2,
      md: 1
    },
    height: {
      xs: '10px',
      md: '100%'
    }
  },
  //=================================
  noDataBox: {
    height: '100%',
    width: '100%',
    display: "grid",
    placeContent: 'center'
  },
  //=================================
  currentBalance: {
    display: "flex",
    flexDirection: "column",
    flex: {
      xs: 0,
      md: 1
    },
    order: {
      xs: 1,
      md: 2
    },
    height: {
      xs: "auto",
      md: "fit-content"
    }
  },
  //=================================
}


const TransactionPage = (props) => {
  // states
  const [transactionsData, setTransactionsData] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [categories, setCategories] = useState([])
  const [range, setRange] = useState('week');
  const [isLoading, setIsLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openSuccessUpdateAlert, setOpenSuccessUpdateAlert] = useState(false);

  //fetch transactions data
  useEffect(() => {
    axios.get("transactions")
      .then(response => setTransactionsData(response.data.Data.reverse()))
      .then(() => setIsLoading(false))
      .catch(err => console.log(err));
    axios.get("categories")
      .then(response => setCategories(response.data))
      .then(() => setIsLoading(false))
      .catch(err => console.log(err));

  }, [])

  useEffect(() => {
    if (transactionsData.length === 0) return setFilteredData([])
    if (transactionsData.length !== 0) return setFilteredData(setDataRange(range));
  }, [transactionsData, range])


  //Delete Handler 
  const handelDelete = (id) => {
    let newData = [];
    axios.delete(`transactions/${id}`)
      .then(
        (response) => {
          if (response.status == 200) {
            newData = transactionsData.filter((item) => {
              return item.id != id
            })
          }
        }
      ).then(() => setTransactionsData(newData))
  }

  //======Add new Transaction Handler!
  const handelSubmit = (data) => {

    axios.post('transactions', data)
      .then(response => {
        if (response.status == 200) {
          let newData = [...transactionsData]
          newData.unshift(response.data.Data)
          setTransactionsData(newData)
        }
      })
      .catch((err) => console.log(err));

  }

  //======update transaction handler
  const handelUpdate = (id, data) => {
    const newData = {
      title: data.title,
      amount: data.amount,
      note: data.note,
      category_id: data.category_id,
      currency_id: data.currency_id,
      created_at: data.created_at
    }
    axios.put(`transactions/${id}`, newData)
      .then(response => {
        if (response.status == 200) {
          let index = transactionsData.findIndex(x => x.id === id)
          const newData = [...transactionsData]
          newData[index] = data
          setTransactionsData(newData)
          setOpenSuccessUpdateAlert(true)
        }
      })

      .catch((err) => console.log(err))
  }

  //======filter data by selected time range
  const setDataRange = (range) => {
    let luxonDate = DateTime.fromISO(transactionsData[0].created_at)

    let dt = DateTime.now();
    let rangeStart = dt.startOf(range)
    let rangeEnd = dt.endOf(range)

    let filteredData = transactionsData.filter(x => {
      let itemTime = DateTime.fromISO(x.created_at)
      return (itemTime >= rangeStart && itemTime <= rangeEnd)
    })

    return filteredData;
  }


  return (

    <>
      <NavBar admin={localStorage.getItem('admin')} />
      <Grid sx={style.body} container height="100vh" overflow="hidden" >
        <Grid xs={'auto'} height='100vh' item component={"aside"}>
          <SideBar />
        </Grid>

        <Grid
          xs
          sm
          item
          sx={style.main}
          component={"main"}
        >
          <Paper
            style={{ height: "calc(100vh - 84px)" }}
            sx={style.paper}
            name="mainContainer"
          >
            {isLoading ?
              <Box sx={style.noDataBox}>
                <CircularProgress color="inherit" />
              </Box>
              :
              <Grid
                overflow={"hidden"}
                container
                name="subGrid"
                height={"100%"}
                sx={style.subGrid}
                columnGap={2}>

                <Grid
                  item
                  xs={12}
                  md={8}
                  lg={9}
                  sx={style.list}
                  name="transactions">

                  <TransactionsList
                    range={range} setRange={setRange}
                    categories={categories}
                    transactions={filteredData} delete={handelDelete} update={handelUpdate} />

                </Grid>
                <Grid md xs={12} sx={style.currentBalance} item name="currentBalance" >
                  <CurrentBalance transactions={filteredData} />
                  <Button variant="contained" sx={{ marginTop: '10px' }} onClick={() => setOpenAddDialog(true)} fullWidth>Add new Transaction</Button>
                </Grid>

              </Grid>}
          </Paper>
        </Grid>
      </Grid>

      {/* ========= New Transactions Modal ======== */}
      <AddTransactionFrom openClose={setOpenAddDialog} open={openAddDialog} submit={handelSubmit} />

      {/* ========= Notification ======== */}
      <Snackbar open={openSuccessUpdateAlert} autoHideDuration={4000} onClose={() => setOpenSuccessUpdateAlert(false)}>
        <Alert
          onClose={() => setOpenSuccessUpdateAlert(false)}
          severity="success"
          sx={{ width: '100%', color: "white", backgroundColor: green[800] }}
        >
          Transaction was successfully Modified!
        </Alert>
      </Snackbar>

    </>
  );
};

export default TransactionPage;
