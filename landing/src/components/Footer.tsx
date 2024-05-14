import { Box, Container, Divider, Grid, Paper, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Copyright from "./copyright/copyright";

type FooterProps = {
  siteUrl: string;
  linkedInUrl: string;
};

const Footer = ({ linkedInUrl }: FooterProps) => {
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
        <Container sx={{ height: "40px" }}></Container>
        <Divider
          sx={{
            backgroundColor: "#836FFF",
            height: "3px",
            mb: "20px",
          }}
        />
        <Container sx={{ height: "40px", pt: "10px" }}>
          <Grid container>
            <Grid
              item
              width={"50%"}
              sx={{
                display: "flex",
                alignItems: "left",
                alignContent: "center",
              }}
            >
              <Copyright />
            </Grid>
            <Grid
              container
              item
              width={"50%"}
              justifyContent={"flex-end"}
              alignItems={"center"}
            >
              <Link href={linkedInUrl} target="_blank">
                <LinkedInIcon color="info" fontSize="large" />
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Box>
  );
};

export default Footer;
