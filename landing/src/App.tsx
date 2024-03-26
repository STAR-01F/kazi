import {
  RenderPageImage,
  Header,
  SectionOne,
  SectionTwo,
  SectionThree,
  Footer,
} from "./components";

function App() {
  const siteUrl = import.meta.env.VITE_BETA_SITE_URL as string;
  return (
    <div>
      <RenderPageImage />
      <Header siteUrl={siteUrl} />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      {/* <Box
                component={Grid}
                container
                width={'100%'}
                height={'500px'}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F8F8F8',
                }}></Box>
            <Box
                component={Grid}
                container
                width={'100%'}
                height={'500px'}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F3F3F3',
                }}></Box> */}
      <Footer siteUrl={siteUrl} />
    </div>
  );
}

export default App;
