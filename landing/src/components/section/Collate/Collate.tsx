import LandingTemplate from "@components/v1_ignore/LandingTemplate";
import ProgressTimeline from "@components/v1_ignore/ProgressTimeline";
import { TextTemplate } from "@components/v1_ignore/TextTemplate";

const CollateTitle =
  "Collate, organise and manage your job applications in one place";
const CollateContent = [
  "Update and track the status of your applications as they progress",
  "Set targets to help keep you focused during your search",
  "Stay up to date with all your target companies with our newsfeed",
];

const Collate = () => {
  return (
    <LandingTemplate
      sOnePriority={8}
      sTwoPriority={4}
      tHeight="300px"
      sectionOne={
        <TextTemplate Title={CollateTitle} Content={CollateContent} />
      }
      sectionTwo={<ProgressTimeline />}
    />
  );
};

export { Collate };
