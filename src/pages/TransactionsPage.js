import { Container, Grid, Paper, Typography } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { createRef, useEffect, useState } from "react";
import TransactionsList from "../components/Transactions components/TransactionsList";
import CurrentBalance from "../components/Transactions components/CurrentBalance";
import axios from "axios";


const style = {
  main: {
    flexGrow: 1,
    height: "xl",
    maxWidth: "xl",
    mt: "74px",
    mb: "10px",
    mr: "10px"
  }
}


const TransactionPage = (props) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);


  //fetch transactions data
  useEffect(
    () => {



      axios.get("transactions")
        .then((response) => { setData(response.data.Data) })
        .then(() => setIsLoading(false))
        .catch(err => console.log(err));

    }, []);



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
                sx={{ overflow: "auto" }}
                columnGap={2}
              >
                <Grid
                  item
                  xs
                  md={9}
                  sx={{
                    maxHeight: "100%"
                  }}
                  name="transactions"

                >
                  <TransactionsList transactions={data} />
                </Grid>

                <Grid md xs={3} item name="currentBalance">
                  <CurrentBalance transactions={data} />
                </Grid>

              </Grid>}
          </Paper>
        </Grid>
      </Grid >
    </>
  );
};

export default TransactionPage;
