import FeedImage from "@assets/newsfeed-img.png";
import { TextTemplate } from "@components/TextTemplate";
import LandingTemplate from "@components/LandingTemplate";
import { Box } from "@mui/material";

const FeedTitle = "Gain company insights with our newsfeed";
const FeedContent = ["Company research right at your fingertips"];

const LandingFeed = () => {
  return (
    <LandingTemplate
      sOnePriority={8}
      sTwoPriority={4}
      tHeight="300px"
      sectionOne={<TextTemplate Title={FeedTitle} Content={FeedContent} />}
      sectionTwo={<Box component={"img"} src={FeedImage} width={"80%"} />}
    />
  );
};

export { LandingFeed };
