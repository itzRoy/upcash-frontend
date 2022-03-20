import React from "react";
import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";

const Logo = () => {
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          color: green[300],
          fontWeight: 400,
          display: { md: "flex" },
        }}
      >
        UP
      </Typography>
      <Typography variant="h6" sx={{ flexGrow: 1, color: "secondary" }}>
        CASH
      </Typography>
    </>
  );
};

export default Logo;
