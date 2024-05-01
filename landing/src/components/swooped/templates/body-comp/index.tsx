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
        minHeight: "300px",
        display: "flex",
        flexDirection: { sm: "column", md: "row" },
        justifyContent: "centre",
        backgroundColor: "#f8f7fe",
      }}
    >
      {textSection}
      {imgSection}
    </Container>
  );
};

export default BodyComp;
