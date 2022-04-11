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
import { useNavigate, useLocation } from "react-router-dom";

const SX = {
  Box: {
    color: "white",
    height: "100vh",
    height: "calc(100vh - 84px)",
    width: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pt: "20px",
    gap: "10px",
    mt: "74px",
  },
  settingsButton: {
    mt: "auto",
    mb: "20px",
    color: "white",
  },
  btnRds: { borderRadius: "0px" },
};

const SideBar = (props) => {
  //==========================
  const navigate = useNavigate();
  const url = useLocation().pathname;
  const handelNavigation = (route) => {
    navigate(`/${route}`);
  };

  return (
    <Box sx={SX.Box}>
      <Button
        onClick={() => handelNavigation("transactions")}
        variant={"contained"}
        color={url === "/transactions" ? "secondary" : "primary"}
        fullWidth
        disableElevation
        style={SX.btnRds}
      >
        Transaction
      </Button>
      <Button
        onClick={() => handelNavigation("reports")}
        variant={"contained"}
        color={url === "/reports" ? "secondary" : "primary"}
        style={SX.btnRds}
        fullWidth
        disableElevation
      >
        Reports
      </Button>
      <Button
        onClick={() => handelNavigation("profit-goal")}
        variant={"contained"}
        color={url === "/profit-goal" ? "secondary" : "primary"}
        style={SX.btnRds}
        fullWidth
        disableElevation
      >
        Profit Goal
      </Button>
      {/*====settings buttons====*/}
      <Button
        onClick={() => handelNavigation("settings")}
        fullWidth
        style={SX.btnRds}
        sx={SX.settingsButton}
      >
        <Box>
          <SettingsIcon color={"white"} />
          <Typography color={"white"}>Settings</Typography>
        </Box>
      </Button>
    </Box>
  );
};

export default SideBar;
