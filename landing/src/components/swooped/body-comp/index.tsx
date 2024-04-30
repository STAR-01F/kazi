import { Box } from "@mui/material";

interface WrapperProps {
  imgSection: React.ReactNode;
  textSection: React.ReactNode;
}

const BodyComp = ({ imgSection, textSection }: WrapperProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { sm: "column", md: "row" },
        justifyContent: "centre",
        width: "99%",
        backgroundColor: "light-pink",
      }}
    >
      {imgSection}
      {textSection}
    </Box>
  );
};

export default BodyComp;
