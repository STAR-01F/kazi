import LandingTemplate from "@components/LandingTemplate";
import { Box } from "@mui/material";
import KaziImage2 from "@assets/kazi-asset2.png";
import { TextTemplate } from "@components/TextTemplate";

const TrackTitle =
  "Track and update the status of your applications as they progress";

const Track = () => {
  return (
    <LandingTemplate
      sOnePriority={8}
      sTwoPriority={4}
      tHeight={"300px"}
      sectionOne={<Box component={"img"} src={KaziImage2} width={"80%"} />}
      sectionTwo={<TextTemplate Title={TrackTitle} Content={["placeholder"]} />}
    />
  );
};

export { Track };
