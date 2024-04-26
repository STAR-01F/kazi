import {
  Header,
  SectionOne,
  Footer,
  Track,
  Collate,
  LandingFeed,
  ViewJobs,
} from "./components";

import { Grid } from "@mui/material";

function App() {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  return (
    <>
      <Header siteUrl={siteUrl} />
      <SectionOne />
      <Grid container spacing={15}>
        <Grid item md={12}>
          <Collate />
        </Grid>
        <Grid item md={12}>
          <Track />
        </Grid>
        <Grid item md={12}>
          <LandingFeed />
        </Grid>
        <Grid item md={12}>
          <ViewJobs />
        </Grid>
        <Grid item md={12}>
          <Footer siteUrl={siteUrl} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
