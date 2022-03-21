import { Container, Grid, Paper, Typography } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";
import { createRef, useEffect, useState } from "react";

const TransactionPage = (props) => {
  //save window and nav bar size in state
  const [navBarH, setNavBarH] = useState(0);
  const [windowH, setWindowH] = useState(0);
  const boxSize = (windowH - navBarH - 20).toString();
  //======================================

  //set windows size in the state
  let updateWindowSize = () => {
    let windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    if (windowHeight != windowH) setWindowH(windowHeight);
  };

  //get nav and window size
  useEffect(() => {
    //add event listener for window size
    window.addEventListener("resize", updateWindowSize);
    let navBarHeight = NavRef.current?.offsetHeight;

    setNavBarH(navBarHeight);
  });

  const NavRef = createRef();

  return (
    <>
      <NavBar ref={NavRef} />
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
            <Paper sx={{ height: `${boxSize}px`, padding: "20px" }}>
              <Typography sx={{ bgcolor: "white" }}>Transaction</Typography>
            </Paper>
          </main>
        </Grid>
      </Grid>
    </>
  );
};

export default TransactionPage;
