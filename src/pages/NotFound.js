import { Button, Container, Divider, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { borderColor, Box, lineHeight } from "@mui/system";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handelNavigation = (route) => {
    navigate(`/${route}`);
  };

  return (
    <Container maxWidth={'lg'}
      component={"div"}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "space-around"
        }}
      >
        <Box sx={{
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }} >
          <Typography
            sx={{ color: "white" }}
            variant="h4"
            fontWeight={100}
            align={"center"}
          >
            404
          </Typography>
          <Divider
            orientation="vertical"
            flexItem
            variant="middle"
            sx={{ borderColor: "white", mx: "20px" }}
          />
          <Typography
            sx={{ color: red[200] }}
            variant="h4"
            fontWeight={100}
            align={"left"}
          >
            The page you are requesting was not found
          </Typography>
        </Box>


        <Button
          onClick={() => handelNavigation("transactions")}
          variant={"contained"}
          color={"primary"}
          disableElevation
        >Go Home</Button>
      </Box>
    </Container>
  );
};

export default NotFound;
