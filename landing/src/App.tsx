import { Header, SectionOne } from "./components";
import { Footer } from "./components";
import { Grid } from "@mui/material";
import NewsFeedLanding from "@components/swooped/newsfeed";
import JobpageLanding from "@components/swooped/allJobs";
import JobAndNotes from "@components/swooped/jobAndNotes";
import Ats from "@components/swooped/getKeywords";

function App() {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  const linkedInUrl = "https://www.linkedin.com/company/kazihub/";
  return (
    <>
      <Header siteUrl={siteUrl} />
      <Grid container spacing={{ xs: 2, md: 7 }}>
        <SectionOne />
        <Grid item xs={12}>
          <JobpageLanding />
        </Grid>
        <Grid item xs={12}>
          <JobAndNotes />
        </Grid>
        <Grid item xs={12}>
          <Ats />
        </Grid>
        <Grid item xs={12}>
          <NewsFeedLanding />
        </Grid>
        <Grid item xs={12}>
          <Footer siteUrl={siteUrl} linkedInUrl={linkedInUrl} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
