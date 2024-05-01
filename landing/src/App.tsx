import { Header, SectionOne } from "./components";
import NewsFeedLanding from "@components/swooped/newsfeed";
import AllJobsLanding from "@components/swooped/allJobs";
import { Footer } from "./components";
import { Grid } from "@mui/material";

function App() {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  return (
    <>
      <Header siteUrl={siteUrl} />
      <SectionOne />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AllJobsLanding />
        </Grid>
        <Grid item xs={12}>
          <NewsFeedLanding />
        </Grid>

        <Grid item xs={12}>
          <Footer siteUrl={siteUrl} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
