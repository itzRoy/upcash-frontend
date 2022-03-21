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
import { useNavigate } from "react-router-dom";

const SX = {
  Box: {
    color: "white",
    height: "100vh",
    maxWidth: "fit-content",
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
  const handelNavigation = (e) => {
    const routeName = e.target.name;
    navigate(`/${routeName}`);
  };

  return (
    <Box sx={SX.Box} style={{ height: "calc(100vh - 84px)" }}>
      <Button
        onClick={handelNavigation}
        name="transactions"
        variant={"contained"}
        color={"secondary"}
        fullWidth
        disableElevation
        style={SX.btnRds}
      >
        Transaction
      </Button>
      <Button
        onClick={handelNavigation}
        name="reports"
        variant={"contained"}
        style={SX.btnRds}
        fullWidth
        disableElevation
      >
        Reports
      </Button>
      <Button
        onClick={handelNavigation}
        name="profit-goal"
        variant={"contained"}
        style={SX.btnRds}
        fullWidth
        disableElevation
      >
        Profit Goal
      </Button>
      {/*====settings buttons====*/}
      <Button
        onClick={handelNavigation}
        name="settings"
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
