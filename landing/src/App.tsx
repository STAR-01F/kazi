import Footer from "@components/Footer";
import Header from "@components/Header";
import RenderPageImage from "@components/PageImage";
import SectionOne from "@components/section/SectionOne";
import SectionThree from "@components/section/SectionThree";
import SectionTwo from "@components/section/SectionTwo";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
