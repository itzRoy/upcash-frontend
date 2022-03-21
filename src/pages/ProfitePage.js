import { Container, Grid, Paper, Typography } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { createRef, useEffect, useState } from "react";
import Reports from "./D-Reports";

const ProfitGoalPage = (props) => {
  const NavRef = createRef();

  return (
    <>
      <NavBar />
      <Grid maxWidth="xl" height="100vh" container>
        <Grid item>
          <SideBar />
        </Grid>

        <Grid
          sx={{ flexGrow: 1, height: "xl" }}
          maxWidth="xl"
          mt={"74px"}
          mb={"10px"}
          mr={"10px"}
          item
        >
          <main>
            <Paper
              style={{ height: "calc(100vh - 84px)" }}
              sx={{ padding: "20px" }}
            >
              <Typography sx={{ bgcolor: "white" }}>Profit-goal</Typography>
            </Paper>
          </main>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfitGoalPage;
