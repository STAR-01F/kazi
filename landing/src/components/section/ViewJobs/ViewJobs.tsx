import AllJobs from "@assets/selection-of-jobs.png";
import { Box } from "@mui/material";
import { TextTemplate } from "@components/v1_ignore/TextTemplate";
import LandingTemplate from "@components/v1_ignore/LandingTemplate";

const ViewTitle = "View all your applications with our beautiful interface";

const ViewJobs = () => {
  return (
    <LandingTemplate
      sOnePriority={4}
      sTwoPriority={8}
      tHeight="300px"
      sectionOne={<Box component={"img"} src={AllJobs} width={"80%"} />}
      sectionTwo={<TextTemplate Title={ViewTitle} Content={["placeholder"]} />}
    />
  );
};

export { ViewJobs };
