import { Container, Divider, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { borderColor, Box, lineHeight } from "@mui/system";

const NotFound = () => {
  return (
    <Container
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
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
    </Container>
  );
};

export default NotFound;
