import { Box, Typography } from "@mui/material";

interface LandingText {
  title: string;
  subtext: string;
}

const TextProp = ({ title, subtext }: LandingText) => {
  return (
    <Box
      sx={{
        width: "60%",
        border: 2,
        borderColor: "pink",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="h5">{subtext}</Typography>
    </Box>
  );
};

export default TextProp;
