import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Swal from "sweetalert2";

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

          <Typography sx={{ mr: 2 }}>{props.admin}</Typography>
          <Button
            color="error"
            name="test"
            onClick={() => {
              Swal.fire({
                title: 'Are you sure? You want to delete this Admin',

                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.clear();
                  navigate("/");
                }
              })

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
