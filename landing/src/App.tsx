import { Header, SectionOne } from "./components";
import tempImg from "@assets/newsfeed-img.png";

import BodyComp from "@components/swooped/body-comp";
import ImageProp from "@components/swooped/image-comp";
import TextProp from "@components/swooped/text-comp";

// const imgP = <ImageProp imgPath = 'hi' />
const imgP = <ImageProp path={tempImg} />;
const textP = (
  <TextProp title="Hello, World!" subtext="This is a sample subtext." />
);
const bodyP = <BodyComp imgSection={imgP} textSection={textP} />;

function App() {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  return (
    <>
      <Header siteUrl={siteUrl} />
      <SectionOne />
      {bodyP}

      {/* <Grid container spacing={15}> */}
      {/* <BodyComp >
        </BodyComp> */}
      {/* <Grid item md={12}>
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
      </Grid> */}
    </>
  );
}

export default App;
