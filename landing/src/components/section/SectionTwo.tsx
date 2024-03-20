import { Box, Button, Grid, Typography } from "@mui/material";

const SectionTwo = () => {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
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
      <Box
        component={Grid}
        container
        width={"100%"}
        height={"300px"}
        padding={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#5836F7",
        }}
      >
        <Box
          component={Grid}
          container
          width={"100%"}
          maxWidth={"lg"}
          padding={5}
          direction={"column"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#5836F7",
          }}
        >
          <Typography
            fontSize={{ xs: "1.5rem", md: "2.8rem" }}
            maxWidth={"lg"}
            fontWeight={"bold"}
            color={"#fff"}
          >
            Enhance your job application
          </Typography>
          <Typography
            // fontWeight={'bold'}
            maxWidth={"lg"}
            mb={5}
            variant="body1"
            color={"#fff"}
          >
            Suite of tools to support you every step of the way
          </Typography>
          <Grid
            container
            item
            maxWidth={"lg"}
            width={"50%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              variant="contained"
              size="large"
              component="a"
              href={`${siteUrl}/signup`}
            >
              Start now
            </Button>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default SectionTwo;
