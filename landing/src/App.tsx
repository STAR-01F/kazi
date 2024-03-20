import {
  RenderPageImage,
  Header,
  SectionOne,
  SectionTwo,
  SectionThree,
  Footer,
} from "./components";

function App() {
  return (
    <div>
      <RenderPageImage />
      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
