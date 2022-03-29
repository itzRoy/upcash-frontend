import { Button, Container, Dialog, Grid, Paper, Typography } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { createRef, useEffect, useState } from "react";
import TransactionsList from "../components/Transactions components/TransactionsList";
import CurrentBalance from "../components/Transactions components/CurrentBalance";
import axios, { Axios } from "axios";
import AddTransactionFrom from "../components/Transactions components/addTransactionFrom";


const style = {
  main: {
    flexGrow: 1,
    height: "xl",
    maxWidth: "xl",
    mt: "74px",
    mb: "10px",
    mr: "10px"
  },
  list: {
    maxHeight: "100%",

  }
}


const TransactionPage = (props) => {
  // states
  const [transactionsData, setTransactionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);


  //fetch transactions data
  useEffect(

    () => {

      //get all transactions
      axios.get("transactions")
        .then((response) => { setTransactionsData(response.data.Data) })
        .catch(err => console.log(err));


      // get all Categories
      axios.get("categories")
        .then((response) => { setCategoriesData(response.data) })
        .then(() => setIsLoading(false))
        .catch(err => console.log(err));

    }


    , []);


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

  //Add new Transaction Handler!
  const handelSubmit = (body) => {

    axios.post('transactions', body)
      .then(response => { if (response.status == 200) console.log(response) })

  }


  return (

    <>
      <NavBar admin={localStorage.getItem('admin')} />
      <Grid container maxWidth="xl" height="100vh">
        <Grid item component={"aside"}>
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
            name="mainContainer"
          >
            {isLoading ? <Typography>Loading...</Typography> :
              <Grid
                overflow={"hidden"}
                container
                name="Grid"
                gap={3}
                height={"100%"}
                sx={{ overflow: "auto", padding: "2px", flexWrap: "wrap-reverse", minHeight: "100%" }}
                columnGap={2}
              >
                <Grid
                  item
                  xs={12}
                  md={9}
                  sx={style.list}
                  name="transactions"

                >
                  <TransactionsList transactions={transactionsData} delete={handelDelete} />
                </Grid>

                <Grid md xs={12} item name="currentBalance">
                  <CurrentBalance transactions={transactionsData} />
                  <Button variant="contained" sx={{ marginTop: '10px' }} onClick={() => setOpen(true)} fullWidth>Add new Transaction</Button>
                </Grid>

              </Grid>}
          </Paper>
        </Grid>
      </Grid>

      {/* ========= New Transactions Modal ======== */}
      <AddTransactionFrom openClose={setOpen} open={open} categories={categoriesData} submit={handelSubmit} />

    </>
  );
};

export default TransactionPage;
