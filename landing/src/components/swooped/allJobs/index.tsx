import { BodyComp, ImageProp, TextProp } from "../../../components";
import allJobsImg from "@assets/homepage.png";
import CallToActionButton from "@components/CtaButton";

const Title = "All applications in one place";
const Subtext = [
  "Easily view all your job applictions in a single, organised dashboard.",
  "No more scattered spreadsheets or forgotten applications.",
  "Update the status of each application as you progress, from applied to interviewing, offered and beyond.",
  "Set and track personal goals for your job search.",
];

const imgP = <ImageProp path={allJobsImg} />;
const textP = <TextProp title={Title} blurbtext={Subtext} />;

const JobpageLanding = () => {
  return (
    <BodyComp
      imgSection={imgP}
      textSection={textP}
      button={<CallToActionButton text="Sign up now" />}
    />
  );
};

export default JobpageLanding;
