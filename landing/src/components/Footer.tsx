import { Box, Button, Container, Divider, Grid, Paper } from "@mui/material";
import KaziIcon from "@assets/kazi-icon.png";

const Footer = () => {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  return (
    <Box
      component={Paper}
      width={"100%"}
      height={"max-content"}
      padding={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0px",
        color: "#fff",
        backgroundColor: "#23272A",
      }}
    >
      <Container>
        <Container sx={{ height: "100px" }}></Container>
        <Divider
          sx={{
            backgroundColor: "#5836F7",
            height: "3px",
            mb: "20px",
          }}
        />
        <Container sx={{ height: "70px", pt: "10px" }}>
          <Grid container>
            <Grid item width={"50%"}>
              <Box
                width={"100%"}
                sx={{
                  width: "70px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                }}
              >
                <img src={KaziIcon} alt="Kazi Logo" />
              </Box>
            </Grid>
            <Grid
              container
              item
              width={"50%"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Button
                variant="contained"
                // color='#2f1d81'
                sx={{ backgroundColor: "#5836F7" }}
                component="a"
                href={`${siteUrl}/signup`}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Box>
  );
};

export default Footer;
