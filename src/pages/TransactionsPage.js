import { Container, Grid, Paper, Typography } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { createRef, useEffect, useState } from "react";
import TransactionsList from "../components/Transactions components/TransactionsList";

const TransactionPage = (props) => {

  return (
    <>
      <NavBar />
      <Grid container maxWidth="xl" height="100vh">
        <Grid item component={"aside"}>
          <SideBar />
        </Grid>

        <Grid
          item
          sx={{ flexGrow: 1, height: "xl" }}
          maxWidth="xl"
          mt={"74px"}
          mb={"10px"}
          mr={"10px"}
          component={"main"}
        >
          <Paper
            style={{ height: "calc(100vh - 84px)" }}
            sx={{ padding: "20px", overflow: "hidden" }}
          >
            <Grid
              overflow={"hidden"}
              container
              name="mainContainer"
              height={"100%"}
            >
              <Grid
                item
                style={{ maxHeight: "100%" }}
                name="transactions"
                xs={12}
                sm={12}
                md={8}
              >
                <TransactionsList />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default TransactionPage;
