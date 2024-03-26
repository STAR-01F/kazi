import { AppBar, Container, Toolbar, Box, Button, Grid } from "@mui/material";
import KaziIcon from "@assets/kazi-icon.png";

type HeaderProps = {
  siteUrl: string;
};
const Header = ({ siteUrl }: HeaderProps) => {
  return (
    <AppBar
      position="static"
      sx={{
        padding: "0px",
        borderRadius: "0px",
        border: "none",
        backgroundColor: "transparent",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
          <Grid container gap={"10px"} width={"max-content"}>
            <Button variant="outlined" component="a" href={`${siteUrl}/signin`}>
              Sign in
            </Button>
            <Button
              variant="contained"
              component="a"
              href={`${siteUrl}/signup`}
            >
              Sign up
            </Button>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
