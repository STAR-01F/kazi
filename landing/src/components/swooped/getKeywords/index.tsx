import { BodyComp, ImageProp, TextProp } from "../../../components";
import amzJobPage from "@assets/keywords_questions.png";
import CallToActionButton from "@components/CtaButton";

const Title = "AI-Powered ATS Optimization and Interview Preparation";
const Subtext = [
  "Kazi can suggest keywords to add to your CV to help beat ATS software.",
  "Improve your chances of getting noticed by hiring managers and recruiters.",
  "Get a curated list of potential interview questions tailored to the specific job you're applying for.",
];

const imgP = <ImageProp path={amzJobPage} />;
const textP = <TextProp title={Title} blurbtext={Subtext} />;

const Ats = () => {
  return (
    <BodyComp
      imgSection={imgP}
      textSection={textP}
      button={<CallToActionButton text="Stand out in interviews" />}
    />
  );
};

export default Ats;
