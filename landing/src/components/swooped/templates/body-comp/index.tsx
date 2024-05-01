import { Container } from "@mui/material";

interface WrapperProps {
  imgSection: React.ReactNode;
  textSection: React.ReactNode;
}

const BodyComp = ({ imgSection, textSection }: WrapperProps) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: { xs: "100px", md: "300px" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "centre",
        backgroundColor: "#f8f7fe",
        p: { xs: "5px", md: "50px" },
        borderRadius: "20px",
      }}
    >
      {textSection}
      {imgSection}
    </Container>
  );
};

export default BodyComp;
