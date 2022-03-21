import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { green, purple, red } from "@mui/material/colors";
import { Box, color } from "@mui/system";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const NavBar = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const primarylight = theme.palette.primary.light;

  return (
    <AppBar elevation={3}>
      <Container maxWidth="xl">
        <Toolbar>
          <Logo />

          <Typography sx={{ mr: 2 }}>Bakri Hmouda</Typography>
          <Button
            color="error"
            name="test"
            onClick={() => {
              navigate("/login");
            }}
            variant="contained"
            disableElevation
          >
            log out
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
