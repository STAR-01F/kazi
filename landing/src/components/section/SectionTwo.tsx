import { Box, Grid } from "@mui/material";

const SectionTwo = () => {
  // const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  return (
    <>
      <Box
        component={Grid}
        container
        width={"100%"}
        height={"300px"}
        padding={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "flex-end",
          backgroundColor: "#5836F7",
        }}
      ></Box>
    </>
  );
};

export default SectionTwo;
