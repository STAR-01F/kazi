import { Box, Button, Container, Grid, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const SectionOne = () => {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  return (
    <Box
      component={Grid}
      container
      width={"100%"}
      height={"650px"}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container
        component={Grid}
        container
        width={"100%"}
        maxWidth={"lg"}
        height={"400px"}
        direction={"column"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box component={"img"} src="/Kazi.svg" height={"200px"} mb={1} />

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
            Unlock your career's full potential
          </Typography>
        </Container>
        <Container
          component={Grid}
          container
          mb={3}
          sx={{
            width: "350px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Typography fontSize={"1.2rem"}>
            Simplify ּ• Track • Succeed
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
            href={siteUrl}
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
