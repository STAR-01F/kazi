import { Container } from "@mui/material";

interface WrapperProps {
  imgSection: React.ReactNode;
  textSection: React.ReactNode;
}
//kazi logo color --> "#836FFF"
const BodyComp = ({ imgSection, textSection }: WrapperProps) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: { xs: "100px", md: "300px" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "centre",
        backgroundColor: "#836FFF",
        p: { xs: "20px", md: "50px" },
        borderRadius: "20px",
        color: "white",
        width: { xs: "90%", md: "100%" },
      }}
    >
      {textSection}
      {imgSection}
    </Container>
  );
};

export default BodyComp;
