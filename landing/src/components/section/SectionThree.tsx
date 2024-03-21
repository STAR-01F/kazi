import { Box, Grid, Typography } from "@mui/material";
import KaziImage2 from "@assets/kazi-asset2.png";

const SectionThree = () => {
  return (
    <Box
      component={Grid}
      container
      width={"100%"}
      py={10}
      direction={"column"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography fontSize={{ xs: "1.5rem", md: "2.8rem" }} fontWeight={"bold"}>
        Track your progress
      </Typography>
      <Typography variant="body1" color={"#5836F7"} mb={5}>
        View your application with ease
      </Typography>
      <Box
        component={Grid}
        container
        item
        maxWidth={"lg"}
        justifyContent={"center"}
      >
        <Box component={"img"} src={KaziImage2} width={"80%"} />
      </Box>
    </Box>
  );
};

export default SectionThree;
