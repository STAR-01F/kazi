import { Box, Container, Divider, Paper, Link } from "@mui/material";
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
      height={{ md: "200px" }}
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
      <Container sx={{ alignSelf: "end" }}>
        <Divider
          sx={{
            backgroundColor: "#836FFF",
            height: "3px",
            mb: "20px",
          }}
        />
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Copyright />
          <Link href={linkedInUrl} target="_blank">
            <LinkedInIcon color="info" fontSize="large" />
          </Link>
        </Container>
      </Container>
    </Box>
  );
};

export default Footer;
