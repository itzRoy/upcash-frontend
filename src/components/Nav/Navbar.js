import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { green, grey, red } from "@mui/material/colors";


import * as React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

const style = {
  confirmButton: {
    backgroundColor: red[800], ":hover": {
      backgroundColor: green[800]
    }
  }
}

const NavBar = (props) => {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);


  const navigate = useNavigate();
  const theme = useTheme();
  const primarylight = theme.palette.primary.light;

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  const handleClickOpen = () => {
    setOpenDeleteDialog(true);
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <AppBar elevation={3}>
        <Container maxWidth="xl">
          <Toolbar>
            <Logo />

            <Typography sx={{ mr: 2 }}>{props.admin}</Typography>
            <Button
              color="error"
              name="test"
              variant="contained"
              disableElevation
              onClick={handleClickOpen}
            >
              log out
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/*--------Modal confirm logout-------*/}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle color={red[700]} id="confirm-delete-dialog">
          {'Are you sure you want to log-out'}
        </DialogTitle>

        <DialogActions>
          <Button autoFocus onClick={() => setOpenDeleteDialog(false)}>
            Cancel
          </Button>
          <Button variant="contained" sx={style.confirmButton} onClick={() => logout()} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NavBar;
