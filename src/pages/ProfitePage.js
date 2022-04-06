import { Container, Grid, Paper, Typography } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { createRef, useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";


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


const ProfitGoalPage = (props) => {
  const NavRef = createRef();

  return (
    <>
      <NavBar admin={localStorage.getItem('admin')} />
      <Grid maxWidth="xl" height="100vh" container>
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
            sx={{ p: {md:'20px'}, overflowY: 'auto' }}
            name="mainContainer">
             <ProgressBar completed={60} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfitGoalPage;
