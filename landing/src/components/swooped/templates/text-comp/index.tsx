import { Box, Typography, Container } from "@mui/material";

interface LandingText {
  title: string;
  subtext: string[];
}

const TextProp = ({ title, subtext }: LandingText) => {
  return (
    <Container
      disableGutters
      sx={{
        minWidth: "50%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          height: "100%",
          minHeight: "300px",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography fontSize={"16px"}>{subtext}</Typography>
      </Box>
    </Container>
  );
};

export default TextProp;
