import LandingTemplate from "@components/LandingTemplate";
import { Box } from "@mui/material";
import KaziImage2 from "@assets/kazi-asset2.png";

const Track = () => {
  return (
    <LandingTemplate
      sOnePriority={8}
      sTwoPriority={4}
      tHeight={"300px"}
      sectionOne={<Box component={"img"} src={KaziImage2} width={"80%"} />}
      sectionTwo={<Box>Hello World</Box>}
    />
  );
};

export { Track };
