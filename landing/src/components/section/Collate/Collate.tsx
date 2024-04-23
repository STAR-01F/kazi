import CollateText from "./CollateText";
import LandingTemplate from "@components/LandingTemplate";
import { Box } from "@mui/material";
import ProgressTimeline from "@components/ProgressTimeline";

const PlaceHolder = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
    >
      IMAGE HERE!
    </Box>
  );
};

const Collate = () => {
  return (
    <LandingTemplate
      sOnePriority={8}
      sTwoPriority={4}
      tHeight={"300px"}
      sectionOne={<CollateText />}
      sectionTwo={<ProgressTimeline />}
    />
  );
};

export { Collate, PlaceHolder };
