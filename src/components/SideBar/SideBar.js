import {
  Button,
  ButtonBase,
  Container,
  Drawer,
  List,
  ListItem,
  makeStyles,
  Typography,
  Toolbar,
  CssBaseline,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box } from "@mui/system";
import { purple } from "@mui/material/colors";
import React from "react";

const SX = {
  Box: {
    color: "white",
    height: "100vh",
    maxWidth: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pt: "200px",
    gap: "10px",
  },
  settingsButton: {
    mt: "auto",
    mb: "20px",
    color: "white",
  },
  btnRds: { borderRadius: "0px" },
};

const SideBar = (props) => {
  return (
    <Box sx={SX.Box}>
      <Button
        variant={"contained"}
        color={"secondary"}
        fullWidth
        disableElevation
        style={SX.btnRds}
      >
        Transaction
      </Button>
      <Button
        variant={"contained"}
        style={SX.btnRds}
        fullWidth
        disableElevation
      >
        Reports
      </Button>
      <Button
        variant={"contained"}
        style={SX.btnRds}
        fullWidth
        disableElevation
      >
        Profit Goal
      </Button>

      {/*====settings buttons====*/}
      <Button fullWidth style={SX.btnRds} sx={SX.settingsButton}>
        <Box>
          <SettingsIcon color={"white"} />
          <Typography color={"white"}>Settings</Typography>
        </Box>
      </Button>
    </Box>
  );
};

export default SideBar;
