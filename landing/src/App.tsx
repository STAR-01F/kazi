import {
  Header,
  SectionOne,
  SectionTwo,
  SectionThree,
  Footer,
} from "./components";
import { Collate } from "@components/section/Collate/Collate";

import ProgressTimeline from "@components/ProgressTimeline";

import { Container } from "@mui/material";

function App() {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  return (
    <Container sx={{ p: 0 }}>
      {/* <RenderPageImage /> */}
      <Header siteUrl={siteUrl} />
      <SectionOne />
      <Collate />
      {/* <SectionTwo /> */}
      <SectionThree />
      <Footer siteUrl={siteUrl} />
    </Container>
  );
}

export default App;
