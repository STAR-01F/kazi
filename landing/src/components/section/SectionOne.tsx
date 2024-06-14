import { Box, Button, Container, Grid, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const SectionOne = () => {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  return (
    <Box
      component={Grid}
      container
      width={"100%"}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        component={Grid}
        container
        width={"100%"}
        height={"400px"}
        direction={"column"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box component={"img"} src="/Kazi.svg" height={"150px"} mb={1} />

        <Container
          component={Grid}
          container
          width={"100%"}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography
            textAlign={"justify"}
            fontWeight={"bold"}
            fontSize={{ xs: "1.5rem", md: "3rem" }}
          >
            Enhance Your Job Search
          </Typography>
        </Container>
        <Container
          component={Grid}
          container
          mb={3}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography fontSize={"1.25 rem"}>
            With a suite of tools to support you every step of the way
          </Typography>
        </Container>
        <Container
          component={Grid}
          container
          width={"100%"}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            startIcon={<OpenInNewIcon />}
            LinkComponent={"a"}
            href={`${siteUrl}/signup`}
            size="large"
            variant="contained"
          >
            Explore
          </Button>
        </Container>
      </Container>
    </Box>
  );
};

export default SectionOne;
