import { Container, Grid, Paper, Typography } from "@mui/material";
import NavBar from "../components/Nav/Navbar";
import SideBar from "../components/SideBar/SideBar";

const TransactionPage = (props) => {
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
          mt={"70px"}
          mr={"5px"}
          item
        >
          <main>
            <Paper disableElevation sx={{ height: "550px", padding: "20px" }}>
              <Typography sx={{ bgcolor: "white" }}>Transaction</Typography>
            </Paper>
          </main>
        </Grid>
      </Grid>
    </>
  );
};

export default TransactionPage;
