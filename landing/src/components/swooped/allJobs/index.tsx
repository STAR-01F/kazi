import { BodyComp, ImageProp, TextProp } from "../../../components";
import allJobsImg from "@assets/job-page-overlay.png";
import CallToActionButton from "@components/CtaButton";

const Title = "job applications in one place";
const Subtext = [
  "Easily view, track and manage the status of all your applications",
];

const imgP = <ImageProp path={allJobsImg} />;
const textP = <TextProp title={Title} blurbtext={Subtext} />;

const JobpageLanding = () => {
  return (
    <BodyComp
      imgSection={imgP}
      textSection={textP}
      button={<CallToActionButton text="try for free" />}
    />
  );
};

export default JobpageLanding;
